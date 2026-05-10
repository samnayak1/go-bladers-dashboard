

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Watch from "../pages/Watch";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />


        <Route
          path="/watch/:username"
          element={<Watch />}
        />


        <Route
          path="/watch/:username/:streamId"
          element={<Watch />}
        />

        <Route
          path="/creator/:username"
          element={<Profile />}
        />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;