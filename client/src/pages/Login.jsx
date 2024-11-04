import {Helmet} from 'react-helmet';
import {} from "../assets/styles/mobile.css"
import LoginContainer from "../../src/components/common/LoginContainer";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login () {

    const navigate = useNavigate();
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("is_login") === "true";
    
        if (isLoggedIn) {
          // Redirect to login page if not logged in
          navigate("/dashboard");
        }
      }, [navigate]);

    return(
        <>
        <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
        </Helmet>
        <body className='login-body'>
            <div className="container-md logincontainer">
                <h4 className='text-center'>Authentication</h4>
                <hr></hr>
                <LoginContainer/>
            </div>

        </body>
      </>
    );
}