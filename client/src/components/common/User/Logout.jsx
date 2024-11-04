import { Navigate } from 'react-router-dom'; // Importing Navigate from react-router-dom for redirection

// Logout component definition
export default function Logout() {
    // Remove login status and session expiry from local storage
    localStorage.removeItem("is_login"); // Clears the login status
    localStorage.removeItem("session_expiry"); // Clears the session expiry time

    // Redirect the user to the home page
    return <Navigate to="/" />;
}
