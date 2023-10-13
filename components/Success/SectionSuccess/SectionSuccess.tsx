import React from "react";
import styles from "./SectionSuccess.module.css";
import { useRouter } from "next/router";

import Section from "../../UI/Section/Section";
import CustomButton from "../../UI/CustomButton/CustomButton";
import Image from "next/image";

import validation from "../../../assets/validation.png";

const SectionSuccess = () => {
  const router = useRouter();
  const type = router.query.type;

  const confirmText =
    type === "mail"
      ? "Un email de confirmation vous a été envoyé"
      : "Notre équipe va prendre en charge votre commande";

  const goHome = () => {
    router.push("/");
  };

  return (
    <Section
      title="Félicitation"
      subTitle="Votre commande à bien été prise en compte"
      className={styles["section"]}
      contentClassName={styles["section-content"]}
    >
      <p className={styles["section-content__text"]}>{confirmText}</p>
      <div className={styles["section-content__image-container"]}>
        <Image src={validation} fill alt="validation logo" />
      </div>
      <CustomButton isBlack onClick={goHome}>
        {"Revenir à l'acceuil"}
      </CustomButton>
    </Section>
  );
};

export default SectionSuccess;
