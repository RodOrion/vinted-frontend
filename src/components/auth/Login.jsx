import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import "./Login.css";

const Login = ({ setToken, onSwitchToSignup, setVisible }) => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      console.log(response);
      
      const token = response.data.token;
      const user = response.data.account.username;
      Cookies.set("token", token);
      setToken({
        "token": token,
        "user": user
      });
      setLoading(false);
      setVisible(false);
    } catch (error) {
      console.log(error.message);
      setError(error.message || "Erreur de connexion");
    }
  };

  return (
    <div
      className="auth-card"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
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
            onChange={handleChange}
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
            onChange={handleChange}
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
      <button
        onClick={() => {
          setVisible(false);
        }}
      >
        X
      </button>
    </div>
  );
};
export default Login;
