"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`
                    ${isOpen ? "bg-slate-800 text-white" : "bg-slate-200 text-slate-800"}
                    m-1.5 cursor-pointer rounded-md
                    hover:bg-blue-800 hover:text-slate-200`}
      onClick={toggleAnswer}
    >
      <div className="flex py-2 px-4">
        <p className="grow">{question}</p>
        <motion.svg
          className="fill-current"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 20 }}
        >
          <rect x="0" fill="none" width="24" height="24" />
          <g>
            <path d="M7 10l5 5 5-5" />
          </g>
        </motion.svg>
      </div>
        {isOpen && (
          <motion.p
            className="py-2 px-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {answer}
          </motion.p>
        )}
    </div>
  );
}
