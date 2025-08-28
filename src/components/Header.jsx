import { Link } from "react-router-dom";
import logoVinted from "../assets/vindet.svg";
import Cookies from "js-cookie";

const Header = ({token, setToken, setVisible}) => {

  return (
    <header>
      <div className="innerContainer flexContainer">
        <Link to="/">
          <img src={logoVinted} alt="" className="logo" />
        </Link>
        <form>
          <input type="search" name="" id="" placeholder="Rechercher" />
        </form>
        <nav>
          <ul className="flexContainer">
            <li>About</li>
            <li>Products</li>
            {
              token ? 
              (
                <li>
                  <button className="alert" onClick={ () => { 
                    setToken(null);
                    Cookies.remove("token");
                    }}>Déconnexion</button>
                </li>
              )
               :
               (<>
              <li>
                  <button
                    onClick={ () => {
                      setVisible(true)
                    }}
                  >S'inscrire</button>
              </li>
              <li>
                  <button
                    onClick={ () => {
                      setVisible(true)
                    }}
                  >Login</button>
              </li>              
              </>)
            }
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
