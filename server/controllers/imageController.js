import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;
    const user = await userModel.findById(userId);

    if (!user || !prompt) {
      return res.json({ success: false, message: "Missing credentials" });
    }

    if (user.creditBalance === 0 || userModel.creditBalance < 0) {
      return res.json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const {data} = await axios.post(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          //Accept: "image/*",
          Accept: "application/json",
        },
        //responseType: "arraybuffer",
      }
    );

    // const base64Image = Buffer.from(data, 'binary').toString('base64')
    // const resultImage  =`data:image/png;base64, ${base64Image}`;

    const resultImage = data.image;

    await userModel.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance - 1})

    res.json({success:true, message:'Image generated succesfully', creditBalance: user.creditBalance-1, resultImage})

  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};
