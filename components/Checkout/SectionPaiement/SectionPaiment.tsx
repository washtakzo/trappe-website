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
      title="Paiment"
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
      className={styles.section}
    >
      <div className={styles["customer-type-container"]}>
        <p>Je suis un</p>
        <select onChange={changeCustomerTypeHandler}>
          <option value="INDIVIDUAL">Particulier</option>
          <option value="PROFESSIONAL">Professionnel</option>
        </select>
      </div>
      <PaimentForm />
    </Section>
  );
};

export default SectionPaiment;
