import React from "react";
import styles from "./PriceOverview.module.css";
import CustomButton from "../../UI/CustomButton/CustomButton";
import { getTrappePrice } from "../../../utils/functions/math";

type Props = {
  trappe: FetchedTrappe;
  trappeWidth: number;
  trappeHeight: number;
};

const PriceOverview = ({ trappe, trappeWidth, trappeHeight }: Props) => {
  const [isInstallationSelected, setIsInstallationSelected] =
    React.useState(true);
  const [isShippingSelected, setIsShippingSelected] = React.useState(false);

  const price = getTrappePrice(trappe, trappeWidth, trappeHeight);
  const option = isInstallationSelected
    ? trappe.setup_price
    : trappe.shipping_price;
  const total = price + option;

  const radioInstallationHandler = () => {
    setIsInstallationSelected(true);
    setIsShippingSelected(false);
  };

  const radioShippingHandler = () => {
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
            onChange={radioInstallationHandler}
          />
          <p>Installation sur site</p>
        </div>
        <div className={styles["radio-choice-container"]}>
          <input
            type="radio"
            className={styles.radio}
            checked={isShippingSelected}
            onChange={radioShippingHandler}
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
          <p>Matériel : {price}</p>
          {isInstallationSelected && (
            <p>Installation sur site : {trappe.setup_price}</p>
          )}
          {!isInstallationSelected && (
            <p>Frais de livraison : {trappe.shipping_price}</p>
          )}
          <p>Total : {total}</p>
        </div>
        <CustomButton onClick={() => {}} className={styles.button}>
          Valider
        </CustomButton>
      </form>
    </section>
  );
};

export default PriceOverview;
