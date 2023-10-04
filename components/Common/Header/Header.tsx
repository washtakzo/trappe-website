import React, { useState, useContext, useEffect } from "react";
import styles from "./Header.module.css";
import Cart from "../Cart/Cart";
import BurgerButton from "../BurgerButton/BurgerButton";
import Image from "next/image";
import logo from "../../../assets/best-employee.png";
import Link from "next/link";
import { useRouter } from "next/router";

import { CardContext } from "../../../store/card-context";
import CartModal from "../CartModal/CartModal";

//TODO:probleme Header arriere plant sur page conception

function Header() {
  const router = useRouter();
  const cardCtx = useContext(CardContext);

  const [burgerBtnIsClicked, setBurgerBtnIsClicked] = useState(false);

  const dialogRef = React.useRef<HTMLDialogElement>(null);

  const goHome = () => {
    router.push("/");
  };

  const burgerClickHandler = () => {
    setBurgerBtnIsClicked((state) => !state);
  };

  const linkContainerStyle = burgerBtnIsClicked
    ? styles["link-container"] + " " + styles.open
    : styles["link-container"];

  return (
    <>
      <header className={styles.header}>
        <div onClick={goHome}>
          <div className={styles["logo-container"]}>
            <Image src={logo} alt="logo" fill />
          </div>
          <h2>Trappe Expert</h2>
        </div>
        <ul className={linkContainerStyle}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <a href="">About</a>
          </li>
          <li>
            <a href="">Contact</a>
          </li>
        </ul>
        <div>
          <Cart
            itemCount={cardCtx.itemsCount}
            onClick={cardCtx.openCartDialog}
          />
          <BurgerButton
            className={styles["burger-btn"]}
            onClick={burgerClickHandler}
          />
        </div>
      </header>
      <CartModal />
    </>
  );
}

Header.propTypes = {};

export default Header;
