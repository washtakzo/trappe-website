import React from "react";
import styles from "./SectionInstallation.module.css";
import Section from "../UI/Section/Section";
import Image from "next/image";
import devisImage from "../../assets/illustration_devis.jpeg";
import installationImage from "../../assets/illustration_installation.jpg";

const SectionInstallation = () => {
  return (
    <Section
      className={styles.section}
      title="Installation"
      subTitle="Installation rapide par nos équipes"
    >
      <div className={styles["section__content"]}>
        <div className={styles["service-overview"]}>
          <div className={styles["text-container"]}>
            <h3>Devis gratuit & rapide</h3>
          </div>
          <div className={styles["image-container"]}>
            <Image
              src={devisImage}
              fill
              className={styles.image}
              alt="illustration technicien devis"
            />
          </div>
        </div>
        <div className={styles["service-overview"]}>
          <div className={styles["text-container"]}>
            <h3>Installation dans toute l&apos;ile-de-france</h3>
          </div>
          <div className={styles["image-container"]}>
            <Image
              src={installationImage}
              fill
              className={styles.image}
              alt="illustration technicien devis"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default SectionInstallation;
