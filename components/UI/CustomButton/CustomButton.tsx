import React from "react";

import styles from "./CustomButton.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "submit";
  isBlack?: boolean;
};

const CustomButton = ({
  children,
  className = "",
  onClick,
  type,
  isBlack,
}: Props) => {
  return (
    <button
      className={`${styles.button} ${
        isBlack && styles["back-white"]
      } ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default CustomButton;
