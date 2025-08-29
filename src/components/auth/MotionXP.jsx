import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"

const ExitAnimation = () => {
    const [isVisible, setIsVisible] = useState(false)

    const clip_anim = {
    initial: {
      clipPath: "circle(0 at 0% 50%)",
      WebkitClipPath: "circle(0 at 0% 50%)",
    },
    enter: {
      clipPath: "circle(140% at 0 10%)",
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

    return (
        <div style={container}>
            <AnimatePresence initial={false}>
                {isVisible ? (
                    <motion.div
                        variants={clip_anim}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        style={box}
                        key="box"
                    />
                ) : null}
            </AnimatePresence>
            <motion.button
                style={button}
                onClick={() => setIsVisible(!isVisible)}
                whileTap={{ y: 1 }}
            >
                {isVisible ? "Hide" : "Show"}
            </motion.button>
        </div>
    )
}
/**
 * ==============   Styles   ================
 */

const container = {
    display: "flex",
    flexDirection: "column",
    width: 100,
    height: 160,
    position: "relative",
}

const box = {
    width: 100,
    height: 100,
    backgroundColor: "#0cdcf7",
    borderRadius: "10px",
}

const button = {
    backgroundColor: "#0cdcf7",
    borderRadius: "10px",
    padding: "10px 20px",
    color: "#0f1115",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
}
export default ExitAnimation



