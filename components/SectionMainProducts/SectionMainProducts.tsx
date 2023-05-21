import React from "react";
import ProductOverview from "../ProductOverview/ProductOverview";
import Section from "../UI/Section/Section";
import imageProduct1 from "../../assets/product1.jpg";
import imageProduct2 from "../../assets/product2.jpg";
import imageProduct3 from "../../assets/product3.jpg";

const SectionMainProducts = () => {
  return (
    <Section title="What is included in Coworking Z">
      <ProductOverview position={0} image={imageProduct1} />
      <ProductOverview position={1} image={imageProduct2} />
      <ProductOverview position={2} image={imageProduct3} />
    </Section>
  );
};

export default SectionMainProducts;
