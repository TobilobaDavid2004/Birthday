"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

export default function Page() {
  const [showMessage, setShowMessage] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showMessage) {
      const audio = new Audio(
        "https://www2.cs.uic.edu/~i101/SoundFiles/HappyBirthday.mid"
      );
      audio.play();
    }
  }, [showMessage]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-100 p-6 text-center relative overflow-hidden">
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-4xl md:text-6xl font-bold text-purple-700 mb-6"
      >
        🎂 Happy Birthday Aunt Esther! 🎉
      </motion.h1>

      {/* Balloons */}
      <div className="flex space-x-4 mb-8">
        {["🎈", "🎈", "🎈", "🎈"].map((balloon, i) => (
          <motion.div
            key={i}
            initial={{ y: 100 }}
            animate={{ y: -20 }}
            transition={{
              repeat: Infinity,
              duration: 2 + i,
              repeatType: "reverse",
            }}
            className="text-4xl"
          >
            {balloon}
          </motion.div>
        ))}
      </div>

      {/* Button to reveal message */}
      <button
        onClick={() => setShowMessage(!showMessage)}
        className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-6 py-3 rounded-2xl shadow-lg"
      >
        {showMessage ? "Hide Surprise 🎁" : "Click for a Surprise 🎁"}
      </button>

      {/* Hidden Message */}
      {showMessage && (
        <>
          <Confetti width={windowSize.width} height={windowSize.height} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 bg-white p-6 rounded-2xl shadow-xl max-w-md"
          >
            <p className="text-xl font-medium text-gray-700">
              Dear Aunt Esther, 💜
              <br />
              Wishing you endless joy, health, and love on your special day. 🎉
              May this year bring you laughter, blessings, and unforgettable
              memories. 🥳
            </p>
          </motion.div>
        </>
      )}

      {/* Footer */}
      <p className="mt-10 text-sm text-gray-600">Made with 💖 just for you.</p>
    </div>
  );
}
