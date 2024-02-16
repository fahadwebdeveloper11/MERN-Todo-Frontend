import React from "react";
// import { motion } from "framer-motion";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        zIndex: 999,
      }}
    >
      <ThreeDots color="#ff2020" height={80} width={80} radius={9} />;
    </div>
  );
};

export default Loader;