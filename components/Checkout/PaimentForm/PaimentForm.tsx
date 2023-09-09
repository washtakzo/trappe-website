import React from "react";
import styles from "./PaimentForm.module.css";
import CustomButton from "../../UI/CustomButton/CustomButton";
import { useContext } from "react";

import { useForm, FieldValues } from "react-hook-form";

import { CardContext } from "../../../store/card-context";
import useHttp from "../../../hooks/use-http";
const API_BASE_URL = process.env.API_BASE_URL;

enum PaimentMethod {
  CARD = "CARD",
  TRANSFERT = "TRANSFERT",
}

type Orders = {
  id: string;
  quantity: number;
  length: number;
  width: number;
  method: string;
  location: {
    address: string;
    city: string;
    postalCode: string;
  };
}[];

type Customer = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: number;
  email: string;
  phoneNumber: string;
};

const PaimentForm = () => {
  //TODO:mettre un résumer de la commande au dessus en mobile et a droite en desktop avec le total du prix
  //TODO:Pour les moyens de paiement mettre des petit carré a selectionner
  //TODO:V2 : voir si possible de mettre adresse livraison et facturation différente sur stripe
  //TODO:voir s'il est meilleur de faire le tableau de requapitulatif de commande dans le corps du mail plutot qu'en PDF
  //TODO:Pré remplir les champs lors du paiement
  //TODO:faire disparaitre le panier lors du click en dehors de la modale
  const cardCtx = useContext(CardContext);

  const { sendRequest, isLoading, data, error, resetError } = useHttp();

  const firstProduct = cardCtx.products?.[0] ?? null;

  const defaultEmail = firstProduct?.info?.email || "";
  console.log({ defaultEmail });
  const defaultAddress = firstProduct?.info?.address || "";
  const defaultCity = firstProduct?.info?.city || "";
  const defaultPostalCode = firstProduct?.info?.postalCode || "";

  const { register, handleSubmit } = useForm({
    defaultValues: {
      lastName: "",
      firstName: "",
      email: defaultEmail,
      phoneNumber: "",
      address: defaultAddress,
      city: defaultCity,
      postalCode: defaultPostalCode,
      paimentMethod: "",
    },
  });

  const PayByCard = (orders: Orders) => {
    sendRequest(API_BASE_URL + "stripe/checkout", {
      method: "POST",
      body: JSON.stringify(orders),
      headers: { "Content-Type": "application/json" },
    });
  };

  const PayByTransfert = (customer: Customer, orders: Orders) => {
    sendRequest(API_BASE_URL + "mail/transfert", {
      method: "POST",
      body: JSON.stringify({ customer, orders }),
      headers: { "Content-Type": "application/json" },
    });
  };

  const submitHandler = (formData: FieldValues) => {
    console.log(formData);
    resetError();

    //TODO:Gérer le numero de telephone côté backend
    //TODO:Customer c'est soit nom ou raison social
    //TODO:Adresse livraison et adresse de facturation peuvent etre differente
    const customer: Customer = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      city: formData.city,
      postalCode: +formData.postalCode,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
    };

    const orders: Orders = cardCtx.products.map((p) => {
      return {
        id: p.trappe.id,
        length: p.length,
        method: p.info?.method || "",
        quantity: p.quantity,
        width: p.width,
        location: {
          address: p.info?.address || "",
          city: p.info?.city || "",
          postalCode: p.info?.postalCode || "",
        },
      };
    });

    if (formData.paimentMethod === PaimentMethod.CARD) {
      PayByCard(orders);
    } else if (formData.paimentMethod === PaimentMethod.TRANSFERT) {
      PayByTransfert(customer, orders);
    }
  };

  React.useEffect(() => {
    if (!data) return;

    if (data.url) {
      window.open(data.url);
    }
  }, [data]);

  return (
    <form
      className={styles["paiment-form"]}
      onSubmit={handleSubmit(submitHandler)}
    >
      <input
        type="text"
        placeholder="Nom"
        {...register("lastName", { required: true })}
      />
      <input
        type="text"
        placeholder="Prenom"
        {...register("firstName", { required: true })}
      />
      <input
        type="email"
        placeholder="Email"
        {...(register("email"), { required: true })}
      />
      <input
        type="number"
        placeholder="Téléphone principale"
        {...(register("phoneNumber"), { required: true })}
      />
      {/* TODO:gérer le style dans le CSS */}
      <p
        style={{
          fontSize: "0.9rem",
          textAlign: "left",
          width: "100%",
          color: "",
        }}
      >
        Le numéro de téléphone est necessaire pour le livreur
      </p>

      <input
        type="number"
        placeholder="Téléphone secondaire"
        {...(register("phoneNumber"), { required: false })}
      />
      <input
        type="text"
        placeholder="Adresse"
        {...(register("address"), { required: true })}
      />
      <input
        type="text"
        placeholder="Ville"
        {...(register("city"), { required: true })}
      />
      <input
        type="number"
        placeholder="Code Postal"
        {...register("postalCode", { required: true })}
      />
      <div className={styles["paiment-container"]}>
        <p>Moyen de paiment :</p>
        <select
          id="paiment-select"
          {...register("paimentMethod", { required: true })}
        >
          <option value={PaimentMethod.CARD}>Carte bancaire</option>
          <option value={PaimentMethod.TRANSFERT}>Virement bancaire</option>
        </select>
      </div>
      {isLoading && <p>loading...</p>}
      {!isLoading && (
        <CustomButton isBlack={true} type="submit">
          Je Commande
        </CustomButton>
      )}
      {error && <p style={{ margin: "auto", textAlign: "center" }}>{error}</p>}
    </form>
  );
};

export default PaimentForm;
