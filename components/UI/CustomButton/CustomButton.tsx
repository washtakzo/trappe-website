import React from "react";

import styles from "./CustomButton.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
};

const CustomButton = ({ children, className, onClick }: Props) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;
