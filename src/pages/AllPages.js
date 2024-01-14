import "../App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import LoginPrivateRoute from "../utils/PrivateRoutes";
import RegisterPage from "./RegisterPage";

const AllPages = () => {
  return (
    <Routes>
      <Route element={<LoginPrivateRoute />}>
        <Route path="/" exact element={<HomePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AllPages;
