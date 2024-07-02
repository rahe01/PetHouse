# Peticaa

## Project Overview
Peticaa is a web application designed to facilitate pet adoptions and donations. This project aims to connect pet lovers with pets in need of homes and support, providing a platform where users can adopt pets or donate to support pet care.

## Features
- **Pet Adoption**: Users can browse and adopt pets listed on the platform.
- **Donations**: Users can donate to support pets and their care.
- **User Authentication**: Secure login and signup using Firebase authentication.

## Technologies Used
- **Frontend**: React, Vite, Tailwind CSS
- **State Management**: @tanstack/react-query
- **UI Components**: Material-UI, Headless UI, Styled-components
- **API Handling**: Axios
- **Authentication and Database**: Firebase
- **Payment Integration**: Stripe
- **Form Handling**: Formik, Yup

## Local Setup
To clone and run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/peticaa.git
    cd peticaa
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up Firebase**:
    - Create a Firebase project on the Firebase Console.
    - Add your Firebase configuration to a `.env` file in the root directory.

4. **Set up Stripe**:
    - Create a Stripe account and get your API keys.
    - Add your Stripe configuration to the `.env` file.

5. **Start the development server**:
    ```bash
    npm run dev
    ```

6. **Access the application**:
    Open your browser and navigate to `http://localhost:3000`

By following these steps, you should be able to run the Peticaa project on your local machine.
