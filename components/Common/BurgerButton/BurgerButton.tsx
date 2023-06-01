import React, { useState } from "react";

import styles from "./BurgerButton.module.css";

type Props = {
  className?: string;
  onClick: () => void;
};

const BurgerButton = ({ className, onClick }: Props) => {
  const [isClicked, setIsClicked] = useState(false);

  const toggleClick = () => {
    setIsClicked((currentState) => !currentState);
    onClick();
  };

  const buttonStyle = isClicked
    ? styles.button + " " + className + " " + styles.open
    : styles.button + " " + className;

  return (
    <div className={buttonStyle} onClick={toggleClick}>
      <div className={styles.burger}></div>
    </div>
  );
};

export default BurgerButton;
