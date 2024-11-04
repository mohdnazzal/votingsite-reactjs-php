import {  Route, Navigate, Routes } from "react-router-dom"; // Importing components for routing
import { BrowserRouter } from "react-router-dom";
import Layout from "../components/layout/layout"; // Importing the main layout component
import UserLayout from "../components/user/layout/layout.jsx"; // Importing the main layout component

import Dashboard from "../pages/User/Dashboard.JSX"; // Importing the main layout component
import MainPage from "../pages/MainPage"; // Importing the MainPage component
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PollURL from "../components/common/User/PollURL.jsx";
import Logout from "../components/common/User/Logout.jsx"
// import URLToken from '../../src/components/common/URLToken';
import {} from "../assets/styles/global.css"; // Importing global CSS styles (currently unused)
// import { useState } from 'react';

function Routing() {
  // const [registerToken, setRegisterToken] = useState('');

  return (
    <div>
      {/* Generate a token and update the state */}
      {/* <URLToken onTokenGenerated={setRegisterToken} /> */}
      <BrowserRouter>
        <Routes>

        {/* Define the routing structure */}
        <Route path="/" element={<Layout />}>
          {/* Default route, renders MainPage */}
          <Route index element={<MainPage />} />

          {/* Redirect for unmatched routes to a custom "not found" page */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />

          {/* Custom "not found" page */}
          <Route path="/not-found" element={<ErrorPage />} />
        </Route>

        {/* Auth routes */}
        <Route>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/logout" element={<Logout />} />


          <Route path="/auth/*" element={<Navigate to="/auth/login" />} />
        </Route>

        <Route path="/dashboard" element={<UserLayout />}>
          {/* Default route, renders MainPage */}
          <Route index element={<Dashboard />} />

          {/* Redirect for unmatched routes to a custom "not found" page */}
          <Route path="/dashboard/*" element={<Navigate to="/dashboard/not-found" replace />} />

          {/* Custom "not found" page */}
          <Route path="/dashboard/not-found" element={<ErrorPage />} />
        </Route>

        <Route path="/polls/*">
          {/* Default route, renders MainPage */}
          {/* <Route index element={<PollURL />} /> */}
          <Route path=":pollId" element={<PollURL />} />
        </Route>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default Routing;
