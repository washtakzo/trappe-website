import { useState } from "react";
import styles from "./Header.module.css";
import Cart from "../Cart/Cart";
import BurgerButton from "../BurgerButton/BurgerButton";
import Image from "next/image";
import logo from "../../../assets/best-employee.png";
import Link from "next/link";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  const [burgerBtnIsClicked, setBurgerBtnIsClicked] = useState(false);

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
