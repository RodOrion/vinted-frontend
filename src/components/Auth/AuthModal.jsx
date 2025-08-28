import { useState } from "react";
import Login from "./Login_xp";
import Register from "./Register";

const AuthModal = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = (user) => {
    console.log("Utilisateur connecté:", user);
    onAuthSuccess(user);
  };
  const handleRegister = (user) => {
    console.log("Utilisateur inscrit:", user);
    onAuthSuccess(user);
  };

  const switchToRegister = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };
  return (
    <>
      {isLogin ? (
        <Login onLogin={handleLogin} onSwitchToRegister={switchToRegister} />
      ) : (
        <Register onRegister={handleRegister} onSwitchToLogin={switchToLogin} />
      )}
    </>
  );
};
export default AuthModal;
