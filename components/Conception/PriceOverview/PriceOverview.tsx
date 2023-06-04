import React from "react";
import styles from "./PriceOverview.module.css";
import CustomButton from "../../UI/CustomButton/CustomButton";

const PriceOverview = () => {
  const [isInstallationSelected, setIsInstallationSelected] =
    React.useState(true);
  const [isShippingSelected, setIsShippingSelected] = React.useState(false);

  const radioInstallationHandler = (
    event: React.MouseEvent<HTMLInputElement>
  ) => {
    setIsInstallationSelected(true);
    setIsShippingSelected(false);
  };

  const radioShippingHandler = (event: React.MouseEvent<HTMLInputElement>) => {
    setIsInstallationSelected(false);
    setIsShippingSelected(true);
  };

  const addressText = isInstallationSelected
    ? "Adresse chantier : "
    : "Adresse livraison : ";

  return (
    <section className={styles.section}>
      <h2 className="section-title">Devis</h2>
      <form action="" className={styles.form}>
        <div className={styles["radio-choice-container"]}>
          <input
            type="radio"
            className={styles.radio}
            checked={isInstallationSelected}
            onClick={radioInstallationHandler}
          />
          <p>Installation sur site</p>
        </div>
        <div className={styles["radio-choice-container"]}>
          <input
            type="radio"
            className={styles.radio}
            checked={isShippingSelected}
            onClick={radioShippingHandler}
          />
          <p>Livraison uniquement</p>
        </div>
        <div className={styles["address-container"]}>
          <p>{addressText}</p>
          <input type="text" />
        </div>
        <div className={styles["address-container"]}>
          <p>Ville</p>
          <input type="text" />
        </div>
        <div className={styles["address-container"]}>
          <p>Code postal</p>
          <input type="number" />
        </div>
        <div className={styles["price-container"]}>
          <h3>Prix</h3>
          <p>Matériel : </p>
          <p>Installation sur site : </p>
          <p>Total : </p>
        </div>
        <CustomButton onClick={() => {}} className={styles.button}>
          Valider
        </CustomButton>
      </form>
    </section>
  );
};

export default PriceOverview;
