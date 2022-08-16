import React from "react";
import Button from "@mui/material/Button";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./Components/PrivateRoute";
import Navbar from "./Components/Navbar";
const App: React.FC = () => {
  return (
    <div className="App">
      <>
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <Routes>
              <Route path="/" element={<Explore />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/profile" element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
            {<Navbar />}
          </div>
        </Router>
      </>
    </div>
  );
};

export default App;
