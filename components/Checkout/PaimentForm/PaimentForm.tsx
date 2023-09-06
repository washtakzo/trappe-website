import React from "react";
import styles from "./PaimentForm.module.css";
import CustomButton from "../../UI/CustomButton/CustomButton";
import { useContext } from "react";

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
};

const PaimentForm = () => {
  const cardCtx = useContext(CardContext);

  const { sendRequest, isLoading, data, error, resetError } = useHttp();

  const firstProduct = cardCtx.products?.[0] ?? null;

  const defaultEmail = firstProduct?.info?.email || "";
  const defaultAddress = firstProduct?.info?.address || "";
  const defaultCity = firstProduct?.info?.city || "";
  const defaultPostalCode = firstProduct?.info?.postalCode || "";

  const [lastName, setLastName] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [email, setEmail] = React.useState(defaultEmail);
  const [address, setAddress] = React.useState(defaultAddress);
  const [city, setCity] = React.useState(defaultCity);
  const [postalCode, setPostalCode] = React.useState(defaultPostalCode);

  const [paimentMethod, setPaimentMethod] = React.useState<string>(
    PaimentMethod.CARD
  );

  const PayByCard = () => {
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

    sendRequest(API_BASE_URL + "stripe/checkout", {
      method: "POST",
      body: JSON.stringify(orders),
      headers: { "Content-Type": "application/json" },
    });
  };

  const PayByTransfert = () => {
    const customer: Customer = {
      firstName,
      lastName,
      address,
      city,
      postalCode: +postalCode,
      email,
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

    sendRequest(API_BASE_URL + "mail/transfert", {
      method: "POST",
      body: JSON.stringify({ customer, orders }),
      headers: { "Content-Type": "application/json" },
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    resetError();

    if (paimentMethod === PaimentMethod.CARD) {
      PayByCard();
    } else if (paimentMethod === PaimentMethod.TRANSFERT) {
      PayByTransfert();
    }
  };

  React.useEffect(() => {
    if (!data) return;

    if (data.url) {
      window.open(data.url);
    }
  }, [data]);

  return (
    <form className={styles["paiment-form"]} onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Nom"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Prenom"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Adresse"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ville"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="number"
        placeholder="Code Postal"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
      />
      <div className={styles["paiment-container"]}>
        <p>Moyen de paiment :</p>
        <select
          name="paiment"
          id="paiment-select"
          value={paimentMethod}
          onChange={(e) => setPaimentMethod(e.target.value)}
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
      {error && error}
    </form>
  );
};

export default PaimentForm;
