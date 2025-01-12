import { motion } from "framer-motion";

export const Shapes = ({ isHover, isPress, mouseX, mouseY }) => {
  const variants = {
    default: { scale: 1 },
    hover: { scale: 1.3 },
    press: { scale: 0.95 }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(60deg, var(--purple) 0%, var(--violet) 30%, var(--pink) 70%)',
          borderRadius: '60px',
          transform: `translate(${mouseX}px, ${mouseY}px)`,
        }}
        variants={variants}
        animate={isPress ? "press" : isHover ? "hover" : "default"}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }}
      />
    </div>
  );
}; 