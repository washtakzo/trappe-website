import React, { useState } from "react";
import styles from "./SectionPaiement.module.css";
import Section from "../../UI/Section/Section";
import PaimentForm from "../PaimentForm/PaimentForm";

type CustomerType = "INDIVIDUAL" | "PROFESSIONAL";

const SectionPaiment = () => {
  const [customerType, setCustomerType] = useState<CustomerType>();

  const changeCustomerTypeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCustomerType = e.target.value;

    if (
      selectedCustomerType !== "INDIVIDUAL" &&
      selectedCustomerType !== "PROFESSIONAL"
    ) {
      throw new Error(
        `The CustomerType option must be INDIVIDUAL or PROFESSIONAL, ${selectedCustomerType} is not supported`
      );
    }

    setCustomerType(selectedCustomerType);
  };

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
