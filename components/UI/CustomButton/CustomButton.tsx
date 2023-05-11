import React from "react";

import styles from "./CustomButton..module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const CustomButton = ({ children, className }: Props) => {
  return (
    <button className={`${styles.button} ${className}`}>{children}</button>
  );
};

export default CustomButton;
