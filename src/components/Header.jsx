//import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logoVinted from "../assets/vinted.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = ({token, setToken, setVisible, setIsLogin, setFormDataSearch}) => {

  const navigate = useNavigate();
  const userID = Cookies.get("userID");

  const updateFormData = (updates) => {
    setFormDataSearch((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const handleChangeSearch = (el) => {
    updateFormData({
      [el.target.name]: el.target.value,
    });
  };

  return (
    <>
      <div className="hero-section">
        <div className="innerContainer flexContainer">
          <Link to="/">
            <img src={logoVinted} alt="" className="logo" />
          </Link>
          <form className="flexContainer">
            <input
              type="search"
              name="title"
              id="title"
              placeholder="Rechercher"
              onChange={handleChangeSearch}
            />
          </form>
          <nav>
            <ul className="flexContainer">
              {token ? (
                <>
                  <li>
                    <Link to={`/dashboard/${userID}`}>
                      <button>Vends tes produits</button>
                    </Link>
                  </li>
                  <li>
                    <button
                      className="alert"
                      onClick={() => {
                        setToken(null);
                        Cookies.remove("token");
                        navigate("/")
                      }}
                    >
                      Déconnexion
                    </button>
                  </li>                
                </>
              ) : (
                <>
                  <li>
                    <button
                      onClick={() => {
                        setVisible(true);
                        setIsLogin(false);
                      }}
                    >
                      S'inscrire
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setVisible(true);
                        setIsLogin(true);
                      }}
                    >
                      Login
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
      <header>
        <div className="banner"></div>
      </header>
    </>
  );
};
export default Header;
