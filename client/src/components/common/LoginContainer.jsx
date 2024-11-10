import { useState, useEffect } from "react";
import axios from "axios";
import {} from "../../assets/styles/mobile.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaValue(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userInput !== captchaValue) {
      setMessage("Captcha does not match. Please try again.");
      setMessageType("danger");
      generateCaptcha();
      return;
    }

    const loginData = { email, password };

    try {
      const response = await axios.post(
        "https://web1002.web.portfolios.mknazzal.com/server/login.php",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // To send cookies securely
        }
      );

      const result = response.data;
      if (result.success) {
        setMessage("Login successful.");
        setMessageType("success");
        sessionStorage.setItem("userID", result.id);
        sessionStorage.setItem("username", result.username);

        localStorage.setItem("is_login", "true");
        localStorage.setItem("session_expiry", Date.now() + 3600000); // 1 hour from now
        window.location.href = "/dashboard";
      } else {
        setMessage(result.message || "Login failed.");
        setMessageType("danger");
        localStorage.setItem("is_login", "false");

      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
      setMessageType("danger");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Email or Username input */}
        <div className="mb-3 login-container">
          <label htmlFor="emailInput" className="form-label">Email or Username</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="emailInput"
            placeholder="Enter your email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Password input */}
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            id="passwordInput"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Captcha input */}
        <div className="mb-3">
          <label htmlFor="captchaInput" className="form-label">
            Captcha: <span style={{ color: "#f53b57", fontWeight: "bold" }}>{captchaValue}</span>
          </label>
          <br />
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter captcha"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>

      {message && (
        <div className={`alert alert-${messageType} mt-3`} role="alert">
          {message}
        </div>
      )}
      <hr />
      <div>
        <a href="/auth/register">Register</a>
      </div>
      <div>
        <a href='/'>Homepage</a>
      </div>
    </div>
  );
};

export default LoginForm;
