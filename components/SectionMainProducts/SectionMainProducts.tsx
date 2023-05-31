import React from "react";
import styles from "./SectionMainProducts.module.css";

import ProductOverview from "../ProductOverview/ProductOverview";
import Section from "../UI/Section/Section";
import imageProduct1 from "../../assets/product1.jpg";
import imageProduct2 from "../../assets/product2.jpg";
import imageProduct3 from "../../assets/product3.jpg";

const SectionMainProducts = () => {
  return (
    <Section
      title="What is included in Coworking Z"
      contentClassName={styles.content}
    >
      <ProductOverview
        position={0}
        primaryImage={imageProduct1}
        secondaryImage={imageProduct2}
      />
      <ProductOverview
        position={1}
        primaryImage={imageProduct2}
        secondaryImage={imageProduct3}
      />
      <ProductOverview position={2} primaryImage={imageProduct3} />
    </Section>
  );
};

export default SectionMainProducts;
