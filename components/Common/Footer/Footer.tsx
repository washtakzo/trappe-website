import React from "react";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer + " background-secondary text-primary"}>
      <div className={styles["footer__content"]}>
        <h3>Trappe Expert</h3>
        <div className={styles["sections-container"]}>
          <div className={styles["link-container"]}>
            <h4>Liens utiles</h4>
            <p className={styles["link-container__link"]}>Acceuil</p>
            <p className={styles["link-container__link"]}>
              Outil de conception
            </p>
            <p className={styles["link-container__link"]}>Nous contacter</p>
          </div>
          <div className={styles["legale-container"]}>
            <h4>Mention légale :</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className={styles["promo-container"]}>
          <h5>Site construit par Jazari</h5>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
