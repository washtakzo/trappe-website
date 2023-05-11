import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Header.module.css";
import Cart from "../Cart/Cart";
import BurgerButton from "../BurgerButton/BurgerButton";
import Image from "next/image";
import logo from "../../assets/best-employee.png";

function Header() {
  const [isClicked, setIsClicked] = useState(false);

  const burgerClickHandler = () => {
    setIsClicked((state) => !state);
  };

  const linkContainerStyle = isClicked
    ? styles["link-container"] + " " + styles.open
    : styles["link-container"];

  return (
    <header className={styles.header}>
      <div>
        <div className={styles["logo-container"]}>
          <Image src={logo} alt="logo" fill />
        </div>
        <h2>Trappe Expert</h2>
      </div>
      <ul className={linkContainerStyle}>
        <li>
          <a href="">Home</a>
        </li>
        <li>
          <a href="">About</a>
        </li>
        <li>
          <a href="">Contact</a>
        </li>
      </ul>
      <div>
        <Cart itemCount={4} />
        <BurgerButton
          className={styles["burger-btn"]}
          onClick={burgerClickHandler}
        />
      </div>
    </header>
  );
}

Header.propTypes = {};

export default Header;
