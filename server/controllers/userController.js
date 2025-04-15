import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import transactionModel from "../models/transactionModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, user: { name: user.name }, token });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found for this email: " + email,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, user: { name: user.name }, token });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      credits: user.creditBalance,
      user: {
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

const paymentStripe = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    const userData = await userModel.findById(userId);

    if (!userId || !planId) {
      console.log("missing credentials userId or planId");
      return res.json({
        success: false,
        message: "Error while validating the user",
      });
    }

    let credits, plan, amount, date;
    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;

      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;

      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;

      default:
        return res.json({ success: false, message: "Invalid Plan" });
    }

    date = Date.now();

    const transactionData = {
      userId,
      plan,
      amount,
      credits,
      date,
    };

    //both lines will be equal to the  .create mtd
    // const newTransaction = new transactionModel(transactionData);
    // const transaction = await newTransaction.save();

    const newTransaction = await transactionModel.create(transactionData);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: process.env.CURRENCY || "lkr",
            product_data: {
              name: `${plan} Plan`,
            },
            unit_amount: amount * 295 * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/verify?success=true&transactionId=${newTransaction._id}`,
      cancel_url: `http://localhost:5173/verify?success=false&transactionId=${newTransaction._id}`,
    });

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

const verifyPayment = async (req, res) => {
  const { transactionId, success } = req.body;
  const transactionData = await transactionModel.findById(transactionId);
  const userData = await userModel.findById(transactionData.userId);

  try {
    if (success == "true") {
      const creditBalance = userData.creditBalance + transactionData.credits;
      await userModel.findByIdAndUpdate(userData._id, { creditBalance });
      await transactionModel.findByIdAndUpdate(transactionId, {
        payment: true,
      });
      res.json({
        success: true,
        message: "Paid successfully",
      });
    } else {
      await transactionModel.findByIdAndDelete(transactionId);
      res.json({
        success: false,
        message: "Payment unsuccesful",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

export { registerUser, loginUser, userCredits, paymentStripe, verifyPayment };
