import "../App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import PrivateRoutes from "../utils/PrivateRoutes";

const AllPages = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" exact element={<HomePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />}></Route>
    </Routes>
  );
};

export default AllPages;
