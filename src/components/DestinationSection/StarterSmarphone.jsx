import React, { useState, useEffect, useRef } from "react";

import { AnimatePresence, motion } from "framer-motion";
import list from "./DestinationList";

const slider = {
  initial: (direction) => ({
    x: direction ? "-100vw" : "100vw",
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction ? "100vw" : "-100vw",
    opacity: 0,
  }),
};

const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

function StarterSmartphone({ selected, setSelected }) {
  const [direction, setDirection] = useState(true);
  const { id, img } = list[selected];
  const swipeConfidenceThreshold = 500;
  let swipe;

  useEffect(() => {
    let slider = setInterval(() => {
      changeRight();
    }, 100000);
    return () => clearInterval(slider);
  }, [selected]);

  const changeRight = () => {
    setDirection(true);
    const newIndex = selected + 1;
    if (newIndex === list.length) setSelected(1);
    else setSelected(newIndex);
  };

  const changeLeft = () => {
    setDirection(false);
    const newIndex = selected - 1;
    if (newIndex < 1) setSelected(list.length - 1);
    else setSelected(newIndex);
  };

  return (
    <motion.div className="w-full pt-6 flex items-center justify-center h-full relative pb-6">
      <AnimatePresence initial="false" custom={direction}>
        <motion.div
          dragConstraints={{ top: 0, bottom: 0 }}
          drag="x"
          dragPropagation
          className="max-w-xs  "
          variants={slider}
          exit="exit"
          animate="animate"
          initial="initial"
          key={id}
          custom={direction}
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}>
          <motion.img
            drag="x"
            dragElastic={0}
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                changeLeft();
              } else if (swipe > swipeConfidenceThreshold) {
                changeRight();
              }
            }}
            src={img}
            alt=""
            className=" rounded-3xl object-cover border-2 max-w-[10rem]"
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default StarterSmartphone;
