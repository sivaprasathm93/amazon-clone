# Amazon Clone

This Amazon clone project is built using React, TypeScript, and Tailwind CSS for the frontend. It aims to replicate the core functionalities of the Amazon website including product listings, user authentication, and cart management.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **SCSS**: A CSS preprocessor that adds special features such as variables, nested rules, and mixins.
- **JavaScript**: The programming language of the web.
- **CSS**: Style sheet language used for describing the look and formatting of a document written in a markup language.
- **HTML**: The standard markup language for documents designed to be displayed in a web browser.

## Frontend Libraries

- **React Router**: For routing in React applications.
- **Redux**: For state management.
- **Axios**: For making HTTP requests.
- **Firebase**: For backend services including authentication and database.
- **Formik**: For building forms in React.
- **Yup**: For schema validation.
- **Tailwind CSS**: For styling.
- **React Icons**: For using icons in React.

## Backend

*   **JSON Data**: Product data is stored in local JSON files to simulate a backend.
*   **Node.js & Express (Server)**: A Node.js server built with Express to handle user authentication and data fetching.
*   **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
*   **MongoDB**: A NoSQL database used to store user data.
*   **JSON Web Tokens (JWT)**: Used for secure authentication.
*   **bcryptjs**: Used for password hashing.
*   **dotenv**: Used to manage environment variables.
*   **cors**: Used to enable Cross-Origin Resource Sharing.

## Features

*  **Product Listings**: Browse a variety of products with details like name, price, rating, and description.
*  **Trending Products**: Highlights products that are currently popular.
*  **Upcoming Products**: Showcases products that will be launched soon.
*  **Product Detail Page**: View detailed information about a specific product.
*  **Shopping Cart**: Add, remove, and update quantities of products in your cart.
*  **Checkout Process**: A simulated checkout experience using Stripe.js.
*  **User Authentication**: Sign-up and login functionality with JWT-based authentication.
*  **Responsive Design**: The application is designed to work on a variety of devices.


## Setup Instructions

1. Clone the repository:
   ```sh
        git clone https://github.com/sivaprasathm93/amazon-clone.git
   ```

2. Navigate to the project directory:
   ```sh
        cd amazon-clone
   ```

3. Install dependencies
   ```sh
        npm install
   ```

4. Install the dependencies for the server:

   ```sh
        cd server
        npm install # or yarn install
        cd ..
   ``` 

5. Configure the environment variables:

    *   Create a `.env` file in the `server` directory.
    *   Add your MongoDB connection string and JWT secret:

    ```
        MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=truew=majority
        JWT_SECRET=<your-jwt-secret>
    ```

## Running the Application

1.  Start the backend server:

    ```sh
         cd server
        yarn server
    ```

    This will start the server using `ts-node` which will automatically compile and run the TypeScript code. Alternatively, you can build the server and then start it:

    ```sh
        yarn build
        yarn start
    ```

2.  Start the frontend development server:

    ```sh
        yarn dev
    ```

    This will start the Vite development server, and the application will be accessible in your browser at `http://localhost:5173`.

