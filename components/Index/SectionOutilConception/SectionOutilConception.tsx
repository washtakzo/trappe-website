import React from "react";
import styles from "./SectionOutilConception.module.css";

import Section from "../../UI/Section/Section";
import Image from "next/image";
import illustration from "../../../assets/conception_illustration.png";
import CustomButton from "../../UI/CustomButton/CustomButton";
import { useRouter } from "next/router";

const SectionOutilConception = () => {
  const router = useRouter();

  const clickHandler = () => {
    router.push("conception");
  };

  return (
    <Section
      title="Outil de conception"
      className={styles.section}
      titleClassName={styles.title}
    >
      <Image
        src={
          "https://www.hsph.harvard.edu/ecpe/wp-content/uploads/sites/2020/2022/03/WHWO22-Article-Cover-Photo-2.png" ??
          illustration
        }
        alt="outil de conception"
        fill
        className={styles.image}
      />
      <div className={styles.content}>
        <p>
          Concevez votre trappe sur mesure et optenez un devis instantanément !
        </p>
        <CustomButton className={styles.button} onClick={clickHandler}>
          Concevoir ma trappe !
        </CustomButton>
      </div>
    </Section>
  );
};

export default SectionOutilConception;
