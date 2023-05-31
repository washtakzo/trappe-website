import React from "react";
import styles from "./SectionOutilConception.module.css";

import Section from "../UI/Section/Section";
import Image from "next/image";
import illustration from "../../assets/conception_illustration.png";
import CustomButton from "../UI/CustomButton/CustomButton";

const SectionOutilConception = () => {
  return (
    <Section
      title="Outil de conception"
      className={styles.section}
      titleClassName={styles.title}
    >
      <Image
        src={illustration}
        alt="outil de conception"
        fill
        className={styles.image}
      />
      <div className={styles.content}>
        <p>
          Concevez votre trappe sur mesure et optenez un devis instantanément !
        </p>
        <CustomButton className={styles.button}>
          Concevoir ma trappe !
        </CustomButton>
      </div>
    </Section>
  );
};

export default SectionOutilConception;
