"use client";

import { motion, type Variants } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delayOffset?: number;
}

const child: Variants = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
};

/** Letter-by-letter reveal. Screen readers get the plain text once. */
export const SplitText = ({ text, className = "", delayOffset = 0 }: SplitTextProps) => {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: delayOffset } },
  };

  return (
    <>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        style={{ display: "inline-block", perspective: "1000px" }}
        variants={container}
        initial="hidden"
        animate="visible"
        className={className}
      >
        {text.split(" ").filter(Boolean).map((word, w) => (
          <span key={w} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.split("").map((character, c) => (
              <motion.span key={c} style={{ display: "inline-block" }} variants={child}>
                {character}
              </motion.span>
            ))}
            <span style={{ display: "inline-block", width: "0.25em" }} />
          </span>
        ))}
      </motion.span>
    </>
  );
};
