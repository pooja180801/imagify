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

    * **Backend (Server):**
        * Create a `.env` file in the `server` directory.
        * Add the following environment variables, replacing the placeholders with your actual values:

            ```
            PORT=4000
            MONGODB_URL=your_mongodb_connection_string
            JWT_SECRET=your_jwt_secret_string
            STRIPE_SECRET_KEY=your_stripe_secret_key
            STABILITY_API_KEY=your_stability_ai_api_key
            FRONTEND_URL=your_frontend_url
            ```

            * **`PORT`:** The port number the backend server will listen on.
            * **`MONGODB_URL`:** Your MongoDB connection string.
            * **`JWT_SECRET`:** A secret string used for JWT authentication.
            * **`STRIPE_SECRET_KEY`:** Your Stripe secret key for payment processing.
            * **`STABILITY_API_KEY`:** Your Stability AI API key for image generation.
            * **`FRONTEND_URL`:** Your front end URL.

    * **Frontend (Client):**
        * Create a `.env` file in the `client` directory.
        * Add the following environment variable:

            ```
            VITE_BACKEND_URL=http://localhost:4000
            ```

            * **`VITE_BACKEND_URL`**: The URL of your backend server. For development, this is often `http://localhost:4000`. For production, this will be the URL of your deployed backend.

    * **Important:**
        * Keep your `.env` files secure and do not commit them to your repository.
        * Add `.env` to your `.gitignore` file in both the `client` and `server` directories. **This is crucial!**

6.  **Run the Backend Server:**

    ```bash
    npm run server
    ```

    *This will start the Node.js/Express server. Typically, it runs on `http://localhost:4000`.*

7.  **Access the Application:**

    * Open your browser and navigate to the frontend URL (e.g., `http://localhost:5173`).
