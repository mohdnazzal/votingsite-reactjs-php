import { useState, useEffect } from "react";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(""); // "success" or "danger"

  // Function to generate random alphanumeric string
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaValue(result);
  };

  useEffect(() => {
    generateCaptcha(); // Generate a new captcha on component mount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate captcha
    if (userInput !== captchaValue) {
      setMessage("Captcha does not match. Please try again.");
      setMessageType("danger");
      generateCaptcha(); // Generate a new captcha
      return;
    }

    // Prepare data for submission
    const userData = {
      name,
      username,
      email,
      password,
    };

    try {
      // Make a POST request to the register.php endpoint
      const response = await fetch("https://web1002.web.portfolios.mknazzal.com/server/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Registration successful.");
        setMessageType("success");
        window.location.href = "/auth/login"; 


      } else {
        setMessage(result.message || "Registration failed.");
        setMessageType("danger");
      }
    } catch (error) {
      setMessage(error + " ,an error occurred while processing your request.");
      setMessageType("danger");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput2" className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="John123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput3" className="form-label">Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleFormControlInput3"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="inputPassword5" className="form-label">Password</label>
              <input
                type="password"
                name="password"
                id="inputPassword5"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="captcha" className="form-label">Captcha: <span style={{color:"#f53b57", fontWeight:"bold"}}>{captchaValue}</span></label>
          <br />
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter captcha"
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Register</button>
      </form>

      {/* Display message */}
      {message && (
        <div className={`alert alert-${messageType} mt-3`} role="alert">
          {message}
        </div>
      )}

      <hr />
      <div>
        <a href='/auth/login'>Already Registered? Login Here</a>
      </div>
      <div>
        <a href='/'>Homepage</a>
      </div>
    </div>
  );
};

export default RegisterForm;
