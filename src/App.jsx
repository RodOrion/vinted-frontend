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
import DashBoard from "./pages/admin/DashBoard";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null)
  const [user, setUser] = useState({
    user_Id:"",
    username:"",
  })
  const [visible, setVisible] = useState(false) // visibilité modale
  const [isLogin, setIsLogin] = useState(false); // card login or register
  const [formDataSearch, setFormDataSearch] = useState({
    title: "",
    priceMax: "",
    priceMin: "",
    sort: "",
  });
console.log(formDataSearch);

  return (
    <Router>
      <Modal setVisible={setVisible} visible={visible} setToken={setToken} setUser={setUser} setIsLogin={setIsLogin} isLogin={isLogin} />
      <Header token={token} user={user} setToken={setToken} setVisible={setVisible} setIsLogin={setIsLogin} setFormDataSearch={setFormDataSearch} />
      <Routes>
        <Route path="/" element={<Home formDataSearch={formDataSearch} setFormDataSearch={setFormDataSearch} />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/dashboard/:owner_id" element={<DashBoard token={token} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
