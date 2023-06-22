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
  
  const trappeId = router.query.id ?? '1';//FIXME:
  
  const trappe = DUMMY_DATA.find(product => product.id === trappeId)!;

  const [selectedWidth, setSelectedWidth] = React.useState(trappe.minWidth);
  const [selectedHeight, setSelectedHeight] = React.useState(trappe.minHeight);

  React.useEffect(()=>{
    setSelectedWidth(trappe.minWidth);
    setSelectedHeight(trappe.minHeight);
  },[trappe])

  const changeWidthHandler = (width:number) => {
    setSelectedWidth(width);
  }

  const changeHeightHandler = (height:number) => {
    setSelectedHeight(height);
  }

  return (
    <main>
      <Header />
      <ProductSelector title="Selectionnez une trappe" />
      <ProductDescription
        trappe={trappe}
      />
      <ProductCustomizer trappe={trappe} onChangeWidth={changeWidthHandler} onChangeHeight={changeHeightHandler}/>
      <PriceOverview selectedWidth={selectedWidth} selectedHeight={selectedHeight}/>
      <Footer />
    </main>
  );
};

export default conception;
