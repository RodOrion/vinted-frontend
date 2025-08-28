import { Link } from "react-router-dom";
import vinted from "../assets/vindet.svg";
const Header = () => {
  return (
    <header>
      <div className="innerContainer flexContainer">
        <Link to="/">
          <img src={vinted} alt="" className="logo" />
        </Link>
        <form>
          <input type="search" name="" id="" placeholder="Rechercher" />
        </form>
        <nav>
          <ul className="flexContainer">
            <li>About</li>
            <li>Products</li>
            <li>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
