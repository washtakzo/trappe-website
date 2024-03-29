import React from "react";
import styles from "./PriceOverview.module.css";

import { useForm, FieldValues } from "react-hook-form";

import CustomButton from "../../UI/CustomButton/CustomButton";
import { getTrappePrice } from "../../../utils/functions";
import { CardContext } from "../../../store/card-context";

type Props = {
  trappe: Trappe;
  trappeWidth: number;
  trappeLength: number;
};

type FormValues = {
  address: string;
  city: string;
  postalCode: string;
  email: string;
};

const PriceOverview = ({ trappe, trappeWidth, trappeLength }: Props) => {
  const cardCtx = React.useContext(CardContext);

  const [isInstallationSelected, setIsInstallationSelected] =
    React.useState(true);

  const [isShippingSelected, setIsShippingSelected] = React.useState(false);

  const defaultFormValues = {
    address: "",
    city: "",
    postalCode: "",
    email: "",
  };

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: defaultFormValues,
  });

  const price = getTrappePrice(trappe, trappeWidth, trappeLength);
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

  const addProductCardHandler = (formData: FieldValues) => {
    cardCtx.addProduct({
      trappe: trappe,
      quantity: 1,
      width: trappeWidth,
      length: trappeLength,
      info: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        method: isInstallationSelected ? "installation" : "shipping",
      },
    });

    cardCtx.openCartDialog();
  };

  return (
    <section className={styles.section}>
      <h2 className="section-title">Devis</h2>
      <form
        className={styles.form}
        onSubmit={handleSubmit(addProductCardHandler)}
      >
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
          <input type="text" {...register("address", { required: true })} />
        </div>
        <div className={styles["address-container"]}>
          <p>Ville</p>
          <input type="text" {...register("city", { required: true })} />
        </div>
        <div className={styles["address-container"]}>
          <p>Code postal</p>
          <input
            type="number"
            {...register("postalCode", { required: true })}
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
