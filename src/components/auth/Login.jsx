import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { handleInputChange } from "../../utils/formUtils";

const Login = ({ setToken, setUser, onSwitchToSignup, setVisible }) => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://site--backend-vinted--zcmn9mpggpg8.code.run/user/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      //console.log(response);
      const token = response.data.token;
      const username = response.data.account.username;
      const userID = response.data._id;
      Cookies.set("token", token);
      Cookies.set("username", username);
      Cookies.set("userID", userID);
      setToken(token);
      setUser({
        username,
        userID
      })
      setLoading(false);
      setVisible(false);
      navigate(`/dashboard/${userID}`)
    } catch (error) {
      console.log(error.message);
      setError(error.message || "Erreur de connexion");
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2>Se connecter</h2>
        <p>Connectez-vous pour vendre et acheter</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(element)=>{handleInputChange(setFormData, element)}}
            placeholder="exemple@email.com"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(element)=>{handleInputChange(setFormData, element)}}
            placeholder="Votre mot de passe"
            required
            disabled={loading}
          />
        </div>

        <button
          className={`auth-button ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      <div className="auth-footer">
        <p>
          Pas encore de compte ?
          <button className="link-button" onClick={onSwitchToSignup}>
            S'inscrire
          </button>
        </p>
      </div>
    </div>
  );
};
export default Login;
