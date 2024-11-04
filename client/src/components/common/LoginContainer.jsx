import { useState, useEffect } from "react";
import axios from "axios";
import {} from "../../assets/styles/mobile.css";

const LoginForm = () => {
  // State variables for email, password, captcha, user input, message, and message type
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(""); // "success" or "danger"

  // Function to generate random alphanumeric captcha
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaValue(result); // Set the generated captcha value
  };

  // UseEffect to generate a new captcha when the component mounts
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate captcha
    if (userInput !== captchaValue) {
      setMessage("Captcha does not match. Please try again.");
      setMessageType("danger");
      generateCaptcha(); // Generate a new captcha
      return; // Exit the function if captcha does not match
    }

    // Prepare data for submission
    const loginData = {
      email,
      password,
    };

    try {
      // Make a POST request to the login endpoint using Axios
      const response = await axios.post(
        "https://web1002.web.portfolios.mknazzal.com/server/login.php",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data); // Log the response data

      const result = response.data;

      // Check if login was successful
      if (result.success) {
        setMessage("Login successful.");
        setMessageType("success");

        // Store user id and username in sessionStorage
        sessionStorage.setItem("userID", result.id);
        sessionStorage.setItem("username", result.username);

        localStorage.setItem("is_login", "true");
        localStorage.setItem("session_expiry", Date.now() + 3600000); // 1 hour from now
        // Redirect to dashboard on successful login
        window.location.href = "/dashboard";
      } else {
        setMessage(result.message || "Login failed.");
        setMessageType("danger");
      }
    } catch (error) {
      setMessage("An error occurred while processing your request: " + error.message);
      setMessageType("danger");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Email or Username input */}
        <div className="mb-3 login-container">
          <label htmlFor="exampleFormControlInput1" className="form-label">Email or Username</label>
          <input
            type="email"
            name="user_input"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter your email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on input change
            required
          />
        </div>
        {/* Password input */}
        <div className="mb-3">
          <label htmlFor="inputPassword5" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            id="inputPassword5"
            className="form-control"
            aria-describedby="passwordHelpBlock"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            required
          />
        </div>
        {/* Captcha input */}
        <div className="mb-3">
          <label htmlFor="captcha" className="form-label">Captcha: <span style={{ color: "#f53b57", fontWeight: "bold" }}>{captchaValue}</span></label>
          <br />
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)} // Update userInput state on input change
            placeholder="Enter captcha"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Login</button> {/* Submit button */}
      </form>

      {/* Display message based on login result */}
      {message && (
        <div className={`alert alert-${messageType} mt-3`} role="alert">
          {message}
        </div>
      )}

      <hr />
      <div>
        <a href="/auth/register">Register</a> {/* Link to registration page */}
      </div>
      <div>
        <a href='/'>Homepage</a> {/* Link to homepage */}
      </div>
    </div>
  );
};

export default LoginForm;
