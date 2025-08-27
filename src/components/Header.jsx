import { Link } from "react-router-dom";
import vinted from "../assets/vindet.svg"
const Header = () => {
    return (
        <header>
            <Link to="/">
                <img src={vinted} alt="" className="logo" />
            </Link>
            <nav>
                <ul>
                    <li>About</li>
                    <li>Products</li>
                </ul>
            </nav>
        </header>
    )
}
export default Header