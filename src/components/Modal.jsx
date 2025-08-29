import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ setVisible, visible, setToken, token, setIsLogin, isLogin }) => {
  const clip_anim = {
    initial: {
      clipPath: "circle(0 at 110% 10%)",
      WebkitClipPath: "circle(0 at 0% 50%)",
    },
    enter: {
      clipPath: "circle(140% at 0 50%)",
      WebkitClipPath: "circle(140% at 0 10%)",
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    exit: {
      clipPath: "circle(0 at 0% 0%)",
      WebkitClipPath: "circle(0 at 0% 0%)",
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
    <AnimatePresence mode="wait">
      {visible && (
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
          <div
            className="auth-container-card"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {isLogin ? (
              <Login
                onSwitchToSignup={onSwitchToSignup}
                setVisible={setVisible}
                setToken={setToken}
              />
            ) : (
              <Signup
                onSwitchToLogin={onSwitchToLogin}
                setVisible={setVisible}
                setToken={setToken}
                token={token}
              />
            )}
            <motion.button
              onClick={() => {
                setVisible(false);
              }}
              whileTap={{ y: 1 }}
            >
              X
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
