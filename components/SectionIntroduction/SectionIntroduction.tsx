import React from "react";
import styles from "./SectionIntroduction.module.css";
import Image from "next/image";
import CustomButton from "../UI/CustomButton/CustomButton";
import illustration from "../../assets/illu1.jpg";
import illustrationSmile from "../../assets/worker_smile.jpg";

const SectionIntroduction = () => {
  return (
    <section className={styles.section}>
      <div className={styles["info-container"]}>
        <div>
          <h1>
            Trappe Expert
            <br />
            Vente et pose de trappe
          </h1>
          <p>
            Trappes de qualité allemande
            <br />
            Vendu et posées par nos équipes
          </p>
        </div>

        <div className={styles["buttons-container"]}>
          <CustomButton
            className={styles["button"] + " background-secondary text-primary"}
          >
            Buy templatez
          </CustomButton>
          <CustomButton
            className={styles["button"] + " " + styles["secondary-button"]}
          >
            Explore all pages
          </CustomButton>
        </div>
      </div>
      <div className={styles["image-container"]}>
        <Image
          src={illustrationSmile}
          alt="illustration"
          fill
          className={styles.image}
        />
      </div>
    </section>
  );
};

export default SectionIntroduction;
