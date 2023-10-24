import React from "react";
import styles from "./SectionIntroduction.module.css";
import Image from "next/image";
import CustomButton from "../../UI/CustomButton/CustomButton";
import illustrationSmile from "../../../assets/worker_smile.jpg";
import { GiFrance } from "react-icons/gi";
import { CiRuler } from "react-icons/ci";
import { FaFileContract, FaTools } from "react-icons/fa";

const SectionIntroduction = () => {
  return (
    <section className={styles.section}>
      <div className={styles["info-container"]}>
        <div className={styles["image-container"]}>
          <div className={styles["gradient-background"]} />
          <Image
            src={
              "https://alis.alberta.ca/media/699261/worker-safety-vest-distribution-centre-istock-1168523877.jpg?cc=0,0.18979370249728555,0,0.050162866449511484&width=1380&height=700&rnd=132616814907730000" ??
              illustrationSmile
            }
            alt="illustration"
            fill
            className={styles.image}
          />
        </div>
        <h1 className="text-primary">Trappe Expert</h1>
        <div className={styles.advantages}>
          <div>
            <GiFrance className={styles.icon} />
            <p>Livraison partout en France</p>
          </div>
          <div>
            <CiRuler className={styles.icon} />
            <p>Trappe sur mesure</p>
          </div>
          <div>
            <FaFileContract className={styles.icon} />
            <p>Devis instantanné</p>
          </div>
          <div>
            <FaTools className={styles.icon} />
            <p>Pose par nos équipes</p>
          </div>
        </div>
        <div className={styles["buttons-container"]}>
          <CustomButton
            className={styles["button"] + " background-secondary text-primary"}
            onClick={() => {
              console.log("click");
            }}
          >
            Buy templatez
          </CustomButton>
          <CustomButton
            className={styles["button"] + " " + styles["secondary-button"]}
            onClick={() => {
              console.log("click");
            }}
          >
            Explore all pages
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default SectionIntroduction;
