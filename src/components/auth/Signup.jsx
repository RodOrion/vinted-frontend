import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { handleInputChange, validateForm } from "../../utils/formUtils";

const Signup = ({ setToken, onSwitchToLogin, setVisible }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    newsletter: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm(formData,setError)) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "https://site--backend-vinted--zcmn9mpggpg8.code.run/user/signup",
        {
          //avatar: false,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          newsletter: true,
        }
      );
      console.log(formData);
      const getToken = response.data.token;
      const user = response.data.account.username;
      const user_id = response.data._id;
      Cookies.set("token", getToken);
      setToken({
        "token": getToken,
        "user": user
      });
      setLoading(false);
      setVisible(false);
      navigate(`/dashboard/${user_id}`)
    } catch (error) {
      console.log(error);
      setError(error.response.data.message || "Erreur de connexion");
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2>S'inscrire</h2>
        <p>Rejoignez la communauté Vinted</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={(element) => {handleInputChange(setFormData, element)}}
            placeholder="Votre nom d'utilisateur"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(element) => {handleInputChange(setFormData, element)}}
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
            onChange={(element) => {handleInputChange(setFormData, element)}}
            placeholder="Au moins 6 caractères"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(element) => {handleInputChange(setFormData, element)}}
            placeholder="Confirmez votre mot de passe"
            required
            disabled={loading}
          />
        </div>

        <div className="form-news-group">
          <input type="checkbox" name="newsletter" id="newsletter" onChange={(element) => {handleInputChange(setFormData, element)}} /> Inscription à la newsletter
        </div>

        <button
          className={`auth-button ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Inscription..." : "S'inscrire"}
        </button>
      </form>

      <div className="auth-footer">
        <p>
          Déjà un compte ?
          <button className="link-button" onClick={onSwitchToLogin}>
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
