//import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logoVinted from "../assets/vinted.png";
import Cookies from "js-cookie";

const Header = ({token,user,setToken,setVisible,setIsLogin,setFormDataSearch,}) => {

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
              <li>About</li>
              <li>Products</li>
              {token ? (
                <li>
                  <button
                    className="alert"
                    onClick={() => {
                      setToken(null);
                      Cookies.remove("token");
                    }}
                  >
                    Déconnexion
                  </button>
                </li>
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
        {user.username && <p>Bonjour {user.username}</p>}
      </div>
      <header>
        <div className="banner"></div>
      </header>
    </>
  );
};
export default Header;
