import React from "react";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer + " background-secondary text-primary"}>
      <div>Trappe Expert</div>
      <div className={styles["sections-container"]}>
        <div className={styles["link-container"]}>
          <h3 className={styles["mini-title"]}>Liens utiles</h3>
          <p className={styles["link-container__link"]}>Acceuil</p>
          <p className={styles["link-container__link"]}>Outil de conception</p>
          <p className={styles["link-container__link"]}>Nous contacter</p>
        </div>
        <div className={styles["legale-container"]}>
          <h3 className={styles["mini-title"]}>Mention légale :</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
      <div className={styles["promo-container"]}>
        <h4>Site construit par Jazari</h4>
      </div>
    </footer>
  );
};

export default Footer;
