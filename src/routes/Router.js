import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";

const Router = ({ isLoggedIn }) => {
  //useEffect()

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} isLoggedIn={isLoggedIn} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
