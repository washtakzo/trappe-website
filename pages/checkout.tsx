import React from "react";
import styles from "./checkout.module.css";

import Header from "../components/Common/Header/Header";
import Footer from "../components/Common/Footer/Footer";

import SectionResume from "../components/Checkout/SectionResume/SectionResume";
import SectionPaiment from "../components/Checkout/SectionPaiement/SectionPaiment";
import { CardContext } from "../store/card-context";
import Section from "../components/UI/Section/Section";

export default function Checkout() {
  const CardCtx = React.useContext(CardContext);

  let PageContent = (
    <div className={styles["sections-container"]} style={{ flexGrow: "1" }}>
      <SectionResume />
      <SectionPaiment />
    </div>
  );

  if (CardCtx.products.length === 0)
    PageContent = (
      <Section
        title="Votre panier est vide"
        style={{ flexGrow: "1" }}
      ></Section>
    );

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      {PageContent}
      <Footer />
    </main>
  );
}
