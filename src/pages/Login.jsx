import { useState, useEffect } from "react";
import { authService } from "../services/authService";
import AuthModal from "../components/Auth/AuthModal";

const Login = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const token = authService.getToken();
    if (token) {
      const savedUser = localStorage.getItem("user");
      if (savedUser && savedUser !== 'undefined' && savedUser !== 'null') {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Erreur parsing user data:', error);
          // Nettoyer le localStorage corrompu
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="App">
      {user ? (
        <div>
          <h1>Bienvenue {user.username} !</h1>
          <button onClick={handleLogout}>Se déconnecter</button>
        </div>
      ) : (
        <AuthModal onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}
export default Login