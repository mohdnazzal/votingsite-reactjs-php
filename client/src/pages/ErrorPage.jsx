//import React from 'react'
import {Helmet} from 'react-helmet';
import WarningImg from "../assets/images/warning.png"
export default function ErrorPage() {
    return (
      <>
        <Helmet>
        <meta charSet="utf-8" />
        <title>404 - Page Not Found</title>
        </Helmet>
        <main>
        <div className="center-container">
            <br></br>
            <br></br>
            <br></br>
            <br></br>


            <div
                    className="owl-icon text-center"
                    style={{
                        backgroundImage: `url(${WarningImg})`,
                        backgroundSize: '225px',
                        backgroundRepeat: 'no-repeat',
                        width: '225px',
                        height: '225px',
                        display: 'flex',            // Use flexbox for centering
                        alignItems: 'center',       // Center vertically
                        justifyContent: 'center',   // Center horizontally
                        margin: '0 auto'            // Center the element itself
                    }}
            ></div>

            <div className="text-center">
              <h1>Oops! Page Not Found</h1>
              <p>The page you’re looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
              <button className="go-back-btn" onClick={() => window.history.back()}>Go Back</button>
            </div>
          </div>
        </main>
      </>
    )
  }
  