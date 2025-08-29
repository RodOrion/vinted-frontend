import "./App.css";
import { useState } from "react";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Modal from "./components/Modal";
import Cookies from "js-cookie";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null)
  const [visible, setVisible] = useState(false) // visibilité modale
  const [isLogin, setIsLogin] = useState(false); // card login or register

  return (
    <Router>
      <Modal setVisible={setVisible} visible={visible} setToken={setToken} setIsLogin={setIsLogin} isLogin={isLogin} />
      <Header token={token} setToken={setToken} setVisible={setVisible} setIsLogin={setIsLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
