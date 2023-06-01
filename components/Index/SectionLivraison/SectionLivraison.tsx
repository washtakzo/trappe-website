import React from "react";
import Section from "../../UI/Section/Section";
import styles from "./SectionLivraison.module.css";
import { FiPackage, FiTruck } from "react-icons/fi";
import { BiTimer } from "react-icons/bi";
import { GiFrance } from "react-icons/gi";

const SectionLivraison = () => {
  return (
    <Section
      title="Livraison"
      subTitle="Nos différents modes de livraison"
      className={"background-secondary-50"}
    >
      <div className={styles.grid}>
        <div className={styles["grid__element"]}>
          <div className={styles["icon__container"]}>
            <FiPackage className={styles["icon"]} />
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        </div>
        <div className={styles["grid__element"]}>
          <div className={styles["icon__container"]}>
            <FiTruck className={styles["icon"]} />
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        </div>
        <div className={styles["grid__element"]}>
          <div className={styles["icon__container"]}>
            <BiTimer className={styles["icon"]} />
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        </div>
        <div className={styles["grid__element"]}>
          <div className={styles["icon__container"]}>
            <GiFrance className={styles["icon"]} />
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        </div>
      </div>
    </Section>
  );
};

export default SectionLivraison;
