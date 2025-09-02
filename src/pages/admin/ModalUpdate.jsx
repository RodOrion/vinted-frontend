import { AnimatePresence, motion } from "framer-motion";
import UpdateProductForm from "../../components/forms/UpdateProductForm";

const ModalUpdate = ({ setModalVisible, modalVisible, offerID }) => {

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

  return (
    <AnimatePresence mode="wait">
      {modalVisible && (
        <motion.div
          key="modal"
          variants={clip_anim}
          initial="initial"
          animate="enter"
          exit="exit"
          className="auth-container"
          onClick={() => {
            setModalVisible(false);
          }}
        >
          <div
            className="auth-container-card"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <UpdateProductForm 
                setModalVisible={setModalVisible}
                offerID={offerID}
            />

            <motion.button
              onClick={() => {
                setModalVisible(false);
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

export default ModalUpdate;
