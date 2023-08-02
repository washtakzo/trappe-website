import React from "react";

import styles from "./CustomButton.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "submit";
};

const CustomButton = ({ children, className, onClick, type }: Props) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default CustomButton;
