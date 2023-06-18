import React from "react";
import styles from "./SectionMainProducts.module.css";

import ProductOverview from "../ProductOverview/ProductOverview";
import Section from "../../UI/Section/Section";
import imageProduct1 from "../../../assets/product1.jpg";
import imageProduct2 from "../../../assets/product2.jpg";
import imageProduct3 from "../../../assets/product3.jpg";
import { useRouter } from "next/router";

import { DUMMY_DATA } from "../../../utils/data";

const SectionMainProducts = () => {
  const router = useRouter();

  const clickHandler = () => {
    router.push("conception");
  };

  return (
    <Section
      title="What is included in Coworking Z"
      contentClassName={styles.content}
    >
      {DUMMY_DATA.map((trappe) => (
        <ProductOverview
          key={trappe.id}
          onClick={clickHandler}
          trappe={trappe}
        />
      ))}
    </Section>
  );
};

export default SectionMainProducts;
