import { motion, type Variants } from "motion/react";

function LoadingThreeDotsJumping({ className }: any) {
  const dotVariants: Variants = {
    jump: {
      transform: "translateY(-30px)",
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      animate="jump"
      transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
      className={className + " container"}
    >
      <motion.div className="dot" variants={dotVariants} />
      <motion.div className="dot" variants={dotVariants} />
      <motion.div className="dot" variants={dotVariants} />
      <StyleSheet />
    </motion.div>
  );
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
  return (
    <style>
      {`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
            }

            .dot {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: linear-gradient(to bottom right, oklch(62.7% 0.265 303.9), oklch(65.6% 0.241 354.308));
                background-size: 80px;              
                will-change: transform;

            .dot:nth-child(1) { background-position: 0 0; }
            .dot:nth-child(2) { background-position: -30px 0; }
            .dot:nth-child(3) { background-position: -60px 0; }
            }
            `}
    </style>
  );
}

export default LoadingThreeDotsJumping;
