import React from "react";
import ProductOverview from "../ProductOverview/ProductOverview";
import Section from "../UI/Section/Section";

const SectionMainProducts = () => {
  return (
    <Section title="What is included in Coworking Z">
      <ProductOverview position={0} />
      <ProductOverview position={1} />
      <ProductOverview position={2} />
    </Section>
  );
};

export default SectionMainProducts;
