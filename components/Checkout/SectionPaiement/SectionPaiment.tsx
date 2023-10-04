import React, { useState } from "react";
import styles from "./SectionPaiement.module.css";
import Section from "../../UI/Section/Section";
import PaimentForm from "../PaimentForm/PaimentForm";

type CustomerType = "INDIVIDUAL" | "PROFESSIONAL";

const SectionPaiment = () => {
  return (
    <Section
      title="Paiement"
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
      className={styles.section}
    >
      <PaimentForm />
    </Section>
  );
};

export default SectionPaiment;
