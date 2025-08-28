import { useState } from "react";
import Login from "../pages/login/Login";
import Signup from "../pages/login/Signup";
import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ setVisible, visible, setToken }) => {
  const [isLogin, setIsLogin] = useState(false);
    
  const clip_anim = {
    initial: {
      clipPath: "circle(0 at 0% 50%)",
      WebkitClipPath: "circle(0 at 0% 50%)",
    },
    enter: {
      clipPath: "circle(140% at 0 14%)",
      WebkitClipPath: "circle(140% at 0 10%)",
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    exit: {
      clipPath: "circle(0 at 0% 50%)",
      WebkitClipPath: "circle(0 at 0% 50%)",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const onSwitchToLogin = () => {
    setIsLogin(true);
  };
  const onSwitchToSignup = () => {
    setIsLogin(false);
  };

  return (
    visible && (
      <AnimatePresence mode="wait">
        <motion.div
          key="modal"
          variants={clip_anim}
          initial="initial"
          animate="enter"
          exit="exit"
          className="auth-container"
          onClick={() => {
            setVisible(false);
          }}
        >
          {isLogin ? (
            <Login
              onSwitchToSignup={onSwitchToSignup}
              setVisible={setVisible}
              setToken={setToken}
            />
          ) : (
            <Signup onSwitchToLogin={onSwitchToLogin} setVisible={setVisible} setToken={setToken} />
          )}
        </motion.div>
      </AnimatePresence>
    )
  );
};

export default Modal;
