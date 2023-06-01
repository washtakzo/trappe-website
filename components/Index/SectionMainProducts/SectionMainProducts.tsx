import React from "react";
import styles from "./SectionMainProducts.module.css";

import ProductOverview from "../ProductOverview/ProductOverview";
import Section from "../../UI/Section/Section";
import imageProduct1 from "../../../assets/product1.jpg";
import imageProduct2 from "../../../assets/product2.jpg";
import imageProduct3 from "../../../assets/product3.jpg";
import { useRouter } from "next/router";

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
      <ProductOverview
        onClick={clickHandler}
        position={0}
        primaryImage={imageProduct1}
        secondaryImage={imageProduct2}
      />
      <ProductOverview
        onClick={clickHandler}
        position={1}
        primaryImage={imageProduct2}
        secondaryImage={imageProduct3}
      />
      <ProductOverview
        onClick={clickHandler}
        position={2}
        primaryImage={imageProduct3}
      />
    </Section>
  );
};

export default SectionMainProducts;
