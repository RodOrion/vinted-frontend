//import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logoVinted from "../assets/vinted.png";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({token, setToken, setVisible, setIsLogin, setFormDataSearch}) => {
  const location = useLocation();
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
                      <button className="small">Vends tes produits</button>
                    </Link>
                  </li>
                  <li>
                    <button
                      className="alert small"
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
                      className="small"
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
                      className="small"
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
      { location.pathname !== `/dashboard/${userID}` && location.pathname !== '/payment' &&
      <header>
        <div className="banner"></div>
      </header>
      }
    </>
  );
};
export default Header;
