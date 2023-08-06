import React from "react";
import styles from "./PriceOverview.module.css";
import CustomButton from "../../UI/CustomButton/CustomButton";
import { getTrappePrice } from "../../../utils/functions";
import { CardContext } from "../../../store/card-context";

type Props = {
  trappe: Trappe;
  trappeWidth: number;
  trappeHeight: number;
};

const PriceOverview = ({ trappe, trappeWidth, trappeHeight }: Props) => {
  const cardCtx = React.useContext(CardContext);

  const [isInstallationSelected, setIsInstallationSelected] =
    React.useState(true);

  const [isShippingSelected, setIsShippingSelected] = React.useState(false);

  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");
  const [email, setEmail] = React.useState("");

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

  const addProductCardHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    cardCtx.addProduct({
      trappe: trappe,
      quantity: 1,
      width: trappeWidth,
      height: trappeHeight,
      info: {
        address,
        city,
        email,
        postalCode,
        method: isInstallationSelected ? "installation" : "shipping",
      },
    });

    cardCtx.openCartDialog();
  };

  return (
    <section className={styles.section}>
      <h2 className="section-title">Devis</h2>
      <form className={styles.form} onSubmit={addProductCardHandler}>
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
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className={styles["address-container"]}>
          <p>Ville</p>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className={styles["address-container"]}>
          <p>Code postal</p>
          <input
            type="number"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div className={styles["address-container"]}>
          <p>email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
        <CustomButton className={styles.button} type="submit">
          Valider
        </CustomButton>
      </form>
    </section>
  );
};

export default PriceOverview;
