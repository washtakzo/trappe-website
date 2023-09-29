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
  address: string;
  city: string;
  postalCode: number;
  email: string;
  mainPhone: string;
  secondaryPhone: string;
  firstName: string;
  lastName: string;
} & (
  | {
      customerType: "INDIVIDUAL";
      companyName: null;
    }
  | {
      customerType: "PROFESSIONAL";
      companyName: string;
    }
);

type FormValues = {
  companyName: string;
  lastName: string;
  firstName: string;
  email: string;
  mainPhone: string;
  secondaryPhone: string;
  address: string;
  city: string;
  postalCode: string;
  paimentMethod: string;
};

type CustomerType = "INDIVIDUAL" | "PROFESSIONAL";

const PaimentForm = () => {
  //DONE:mettre un résumer de la commande au dessus en mobile et a droite en desktop avec le total du prix
  //TODO:V2 : voir si possible de mettre adresse livraison et facturation différente sur stripe
  //DONE:voir s'il est meilleur de faire le tableau de requapitulatif de commande dans le corps du mail plutot qu'en PDF

  //DONE:Pré remplir les champs lors du paiement :
  //https://stackoverflow.com/questions/76229874/how-to-save-shipping-address-to-fill-it-automatically-every-time-i-go-to-strip#:~:text=When%20using%20Stripe%20Checkout%2C%20it's,and%20its%20associated%20billing%20address.

  //DONE:2 formulaire pour pro/particulier le pro a une raison social et une adresse de facturation
  const cardCtx = useContext(CardContext);

  const { sendRequest, isLoading, data, error, resetError } = useHttp();

  const defaultFormValues = {
    companyName: "",
    lastName: "",
    firstName: "",
    email: "",
    mainPhone: "",
    secondaryPhone: "",
    address: "",
    city: "",
    postalCode: "",
    paimentMethod: "",
  };

  const {
    register,
    handleSubmit,
    reset: resetForm,
  } = useForm<FormValues>({ defaultValues: defaultFormValues });

  const [customerType, setCustomerType] =
    React.useState<CustomerType>("PROFESSIONAL");

  const changeCustomerTypeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let selectedCustomerType: string = e.target.value;

    if (
      selectedCustomerType !== "INDIVIDUAL" &&
      selectedCustomerType !== "PROFESSIONAL"
    ) {
      throw new Error(
        `The CustomerType option must be INDIVIDUAL or PROFESSIONAL, ${selectedCustomerType} is not supported`
      );
    }

    resetForm();
    setIsPaimentMethodChoose(false);
    setSubmitButtonHasBeenPressed(false);

    setCustomerType(selectedCustomerType);
  };

  const [isPaimentMethodChoose, setIsPaimentMethodChoose] =
    React.useState(false);

  const [submitButtonHasBeenPressed, setSubmitButtonHasBeenPressed] =
    React.useState(false);

  const PayByCard = (customer: Customer, orders: Orders) => {
    sendRequest(API_BASE_URL + "stripe/checkout", {
      method: "POST",
      body: JSON.stringify({ customer, orders }),
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
    console.log({ formData });

    setSubmitButtonHasBeenPressed(true);

    resetError();

    //TODO:Gérer le numero de telephone côté backend
    const customer: Customer = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      city: formData.city,
      postalCode: +formData.postalCode,
      email: formData.email,
      mainPhone: formData.mainPhone,
      secondaryPhone: formData.secondaryPhone,
      customerType: customerType,
      companyName:
        customerType === "PROFESSIONAL" ? formData.companyName : null,
    };

    const orders: Orders = cardCtx.products.map((p) => {
      return {
        id: p.trappe.id,
        length: p.length,
        method: p.info?.method ?? "",
        quantity: p.quantity,
        width: p.width,
        location: {
          address: p.info?.address ?? "",
          city: p.info?.city ?? "",
          postalCode: p.info?.postalCode ?? "",
        },
      };
    });

    if (formData.paimentMethod === PaimentMethod.CARD) {
      PayByCard(customer, orders);
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
    <>
      <div className={styles["customer-type-container"]}>
        <p>Je suis un</p>
        <select onChange={changeCustomerTypeHandler}>
          <option value="PROFESSIONAL">Professionnel</option>
          <option value="INDIVIDUAL">Particulier</option>
        </select>
      </div>
      <form
        className={styles["paiment-form"]}
        onSubmit={handleSubmit(submitHandler)}
      >
        {customerType === "PROFESSIONAL" && (
          <input
            type="text"
            placeholder="Raison social"
            {...register("companyName", { required: true })}
          />
        )}
        <input
          type="text"
          placeholder={"Nom"}
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
          {...register("email", { required: true })}
        />
        <input
          type="number"
          placeholder="Téléphone principale"
          {...register("mainPhone", { required: true })}
        />
        <p className={styles["input-instruction"]}>
          Le numéro de téléphone est necessaire pour le livreur
        </p>
        <input
          type="number"
          placeholder="Téléphone secondaire"
          {...register("secondaryPhone", { required: false })}
        />
        <input
          type="text"
          placeholder={
            customerType === "PROFESSIONAL"
              ? "Adresse (siège social)"
              : "Adresse"
          }
          {...register("address", { required: true })}
        />
        <input
          type="text"
          placeholder={
            customerType === "PROFESSIONAL" ? "Ville (siège social)" : "Ville"
          }
          {...register("city", { required: true })}
        />
        <input
          type="number"
          placeholder={
            customerType === "PROFESSIONAL"
              ? "Code Postal (siège social)"
              : "Code Postal"
          }
          {...register("postalCode", { required: true })}
        />
        <div className={styles["paiment-container"]}>
          <p>Moyen de paiment :</p>
          <div className={styles["radio-container"]}>
            <input
              style={{ "--title": "'CB'" } as React.CSSProperties}
              type="radio"
              value={PaimentMethod.CARD}
              id="radio-card"
              {...register("paimentMethod", { required: true })}
              onClick={() => setIsPaimentMethodChoose(true)}
            />
            <input
              style={{ "--title": "'Virement'" } as React.CSSProperties}
              type="radio"
              value={PaimentMethod.TRANSFERT}
              id="radio-transfert"
              {...register("paimentMethod", { required: true })}
              onClick={() => setIsPaimentMethodChoose(true)}
            />
          </div>
          {!isPaimentMethodChoose && submitButtonHasBeenPressed && (
            <p style={{ color: "red" }}>
              Veuillez choisir un moyen de paiement
            </p>
          )}
        </div>
        {isLoading && <p>loading...</p>}
        {!isLoading && (
          <CustomButton
            isBlack={true}
            type="submit"
            onClick={() => setSubmitButtonHasBeenPressed(true)}
          >
            Je Commande
          </CustomButton>
        )}
        {error && (
          <p style={{ margin: "auto", textAlign: "center" }}>{error}</p>
        )}
      </form>
    </>
  );
};

export default PaimentForm;
