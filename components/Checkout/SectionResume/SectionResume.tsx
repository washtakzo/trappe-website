import React from "react";

import styles from "./SectionResume.module.css";

import Section from "../../UI/Section/Section";
import { useContext } from "react";
import { CardContext } from "../../../store/card-context";
import CartResume from "../CartResume/CartResume";

const SectionResume = () => {
  const cardCtx = useContext(CardContext);
  const products = cardCtx.products;

  return (
    <Section title="Résumé de votre commande" className={styles.section}>
      {products.map((product) => (
        <>
          <CartResume
            key={`${product.trappe.id} ${product.width}x${product.length}`}
            product={product}
          />
          <CartResume
            key={`${product.trappe.id} ${product.width}x${product.length}`}
            product={product}
          />
        </>
      ))}
      <h3 className={styles.total}>
        Total : <span>{cardCtx.totalAmount}€</span>
      </h3>
    </Section>
  );
};

export default SectionResume;
