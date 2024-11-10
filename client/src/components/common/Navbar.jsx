export default function Navbar() {
  // Check if the user is logged in by retrieving the value from localStorage
  const isLoggedIn = localStorage.getItem("is_login");

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-font-color navbar-bg-color nav-size sticky-top"
        style={{ position: 'fixed', top: '0', width: '100%', zIndex: '1000' }} // Fixed position for the navbar
      >
        <div className="container-fluid">
          {/* Button for toggling the navbar on small screens */}
          <button
            className="navbar-toggler"
            type="button" // Ensure the button is correctly typed
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon nv-toggle-icon"></span>
          </button>

          {/* Collapsible navbar content */}
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {/* Navigation link for Home */}
              <li className="nav-item">
                <a className="nav-link textdecor" aria-current="page" href="/">
                  Home
                </a>
              </li>
              {/* Navigation link for Features */}
              <li className="nav-item">
                <a className="nav-link textdecor" href="#features">
                  Features
                </a>
              </li>
              {/* Navigation link for Cases */}
              <li className="nav-item">
                <a className="nav-link textdecor" href="#cases">
                  Cases
                </a>
              </li>
              <li className="nav-item dropdown">
                {/* Conditional rendering based on the login status */}
                <a
                  className="nav-link textdecor dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Account
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  {isLoggedIn ? (
                    // Account dropdown for logged-in users
                    <>
                      <a className="dropdown-item" href="/dashboard">Dashboard</a>
                      <a className="dropdown-item" href="/auth/logout">Logout</a>
                    </>
                  ) : (
                    // Account dropdown for non-logged-in users
                    <>
                      <a className="dropdown-item" href="/auth/login">Login</a>
                      <a className="dropdown-item" href="/auth/register">Register</a>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
