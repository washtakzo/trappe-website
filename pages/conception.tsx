import React from "react";

import Header from "../components/Common/Header/Header";
import ProductSelector from "../components/Conception/ProductSelector/ProductSelector";
import ProductDescription from "../components/Conception/ProductDescription/ProductDescription";
import ProductCustomizer from "../components/Conception/ProductCustomizer/ProductCustomizer";
import PriceOverview from "../components/Conception/PriceOverview/PriceOverview";

const conception = () => {
  return (
    <main>
      <Header />
      <ProductSelector />
      <ProductDescription />
      <ProductCustomizer />
      <PriceOverview />
    </main>
  );
};

export default conception;
