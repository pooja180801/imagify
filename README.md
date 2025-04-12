# Imagify - Text-to-Image Generation with MERN and Stripe

Imagify is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js). It empowers users to convert textual descriptions into visually stunning images using Stability AI's powerful text-to-image generation capabilities. The platform also features seamless integration with Stripe for secure payments, enabling access to premium image generation features.

![Imagify Screenshot (Replace with your actual screenshot)](./path/to/your/screenshot.png)  
*Replace `./path/to/your/screenshot.png` with a relevant screenshot of your app.*

## 🔧 Tech Stack

* **Frontend:** React, Tailwind CSS
* **Backend:** Node.js, Express
* **Database:** MongoDB
* **Payment:** Stripe
* **Authentication:** JWT (JSON Web Tokens)
* **AI Integration:** Stability AI

## 🚀 Running the Application

To get Imagify up and running on your local machine, follow these steps:

1.  **Clone the Repository:**

    ```bash
    git clone <YOUR_REPOSITORY_URL>
    ```

    *Replace `<YOUR_REPOSITORY_URL>` with your actual GitHub repository URL.*

2.  **Install Frontend Dependencies:**

    ```bash
    cd client
    npm install
    ```

3.  **Run the Frontend Development Server:**

    ```bash
    npm run dev
    ```

    *This will start the React development server. Typically, it runs on `http://localhost:5173`. Check your console for the exact address.*

4.  **Install Backend Dependencies:**

    ```bash
    cd ../server
    npm install
    ```

5.  **Set up Environment Variables:**

    * Create a `.env` file in the `server` directory.
    * Add the following environment variables, replacing the placeholders with your actual values:

        ```
        PORT=4000
        MONGODB_URI=<YOUR_MONGODB_CONNECTION_STRING>
        JWT_SECRET=<YOUR_JWT_SECRET>
        STRIPE_SECRET_KEY=<YOUR_STRIPE_SECRET_KEY>
        STABILITY_AI_API_KEY=<YOUR_STABILITY_AI_API_KEY>
        ```

    * **Important:** Keep your `.env` file secure and do not commit it to your repository. Add `.env` to your `.gitignore` file.

6.  **Run the Backend Server:**

    ```bash
    npm run server
    ```

    *This will start the Node.js/Express server. Typically, it runs on `http://localhost:4000`.*

7.  **Access the Application:**

    * Open your browser and navigate to the frontend URL (e.g., `http://localhost:5173`).

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Submit a pull request.
