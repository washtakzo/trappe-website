import React from "react";

import Header from "../components/Common/Header/Header";
import ProductSelector from "../components/Conception/ProductSelector/ProductSelector";
import ProductDescription from "../components/Conception/ProductDescription/ProductDescription";
import ProductCustomizer from "../components/Conception/ProductCustomizer/ProductCustomizer";
import PriceOverview from "../components/Conception/PriceOverview/PriceOverview";
import Footer from "../components/Common/Footer/Footer";

const conception = () => {
  return (
    <main>
      <Header />
      <ProductSelector title="Selectionnez une trappe" />
      <ProductDescription
        title="Trappe 1"
        description="lorem 13 456  3sd fsd5f4 3sd 35dsf4 dsfdsfds sdfsdfsdf sdfdsfsdfsd dsfdsf sdf 5646 sdf sdf sdf65464"
        images={["product1.jpg", "product2.jpg", "product3.jpg"]}
      />
      <ProductCustomizer />
      <PriceOverview />
      <Footer />
    </main>
  );
};

export default conception;
