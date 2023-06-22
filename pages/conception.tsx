import React from "react";

import Header from "../components/Common/Header/Header";
import ProductSelector from "../components/Conception/ProductSelector/ProductSelector";
import ProductDescription from "../components/Conception/ProductDescription/ProductDescription";
import ProductCustomizer from "../components/Conception/ProductCustomizer/ProductCustomizer";
import PriceOverview from "../components/Conception/PriceOverview/PriceOverview";
import Footer from "../components/Common/Footer/Footer";
import { useRouter } from "next/router";

import { DUMMY_DATA } from "../utils/data";

const conception = () => {
  const router = useRouter();

  const trappeId = router.query.id ?? '1';

  console.log('conception render');
  

  const trappe = DUMMY_DATA.find(product => product.id === trappeId)!;
  return (
    <main>
      <Header />
      <ProductSelector title="Selectionnez une trappe" />
      <ProductDescription
        trappe={trappe}
      />
      <ProductCustomizer trappe={trappe} />
      <PriceOverview />
      <Footer />
    </main>
  );
};

export default conception;
