import React from "react";
import styles from "./SectionMainProducts.module.css";

import ProductOverview from "../ProductOverview/ProductOverview";
import Section from "../../UI/Section/Section";
import { useRouter } from "next/router";

const SectionMainProducts = ({ trappes }: { trappes: Trappe[] }) => {
  const router = useRouter();

  const clickHandler = (id: string) => () => {
    router.push({ pathname: "/conception", query: { id } });
    console.log({ id });
  };

  return (
    <Section
      title="What is included in Coworking Z"
      contentClassName={styles.content}
    >
      {trappes.map((trappe) => (
        <ProductOverview
          key={trappe.id}
          onClick={clickHandler(trappe.id)}
          trappe={trappe}
        />
      ))}
    </Section>
  );
};

export default SectionMainProducts;
