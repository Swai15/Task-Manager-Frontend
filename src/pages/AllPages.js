import "../App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import LoginPage from "./LoginPage";

function AllPages() {
  return (
    <div className="all-pages">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
