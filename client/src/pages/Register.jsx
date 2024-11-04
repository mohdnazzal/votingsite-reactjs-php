import {Helmet} from 'react-helmet';
import RegisterContainer from "../../src/components/common/RegisterContainer";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Register () {

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
        <title>Register</title>
        </Helmet>
        <body className="register-body">
            <div className="container-md logincontainer">
                <h4 className='text-center'>New Account</h4>
                <hr></hr>
                <RegisterContainer/>
            </div>

        </body>
      </>
    );
}