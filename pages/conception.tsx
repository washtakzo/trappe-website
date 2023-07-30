import React from "react";
import { useRouter } from "next/router";

import Header from "../components/Common/Header/Header";
import ProductSelector from "../components/Conception/ProductSelector/ProductSelector";
import ProductDescription from "../components/Conception/ProductDescription/ProductDescription";
import ProductCustomizer from "../components/Conception/ProductCustomizer/ProductCustomizer";
import PriceOverview from "../components/Conception/PriceOverview/PriceOverview";
import Footer from "../components/Common/Footer/Footer";
import { DUMMY_DATA } from "../utils/data";
import { getAllTrappes } from "../utils/http";
import { GetStaticProps } from "next";

type Props = {
  trappes: Trappe[];
};

const Conception = ({ trappes }: Props) => {
  const router = useRouter();
  const trappeId = router.query.id;

  const [selectedTrappe, setSelectedTrappe] = React.useState<Trappe>();

  console.log({ trappeId });

  React.useEffect(() => {
    setSelectedTrappe(trappes.find((trappe) => trappe.id == trappeId));
  }, [trappeId, trappes]);

  // const selectedTrappe = DUMMY_DATA.find((trappe) => trappe.id == trappeId);
  // const selectedTrappe = trappes.find((trappe) => trappe.id == trappeId);

  const [selectedWidth, setSelectedWidth] = React.useState<number | undefined>(
    selectedTrappe?.min_width
  );
  const [selectedHeight, setSelectedHeight] = React.useState<
    number | undefined
  >(selectedTrappe?.min_height);

  const changeWidthHandler = (width: number) => {
    setSelectedWidth(width);
  };

  const changeHeightHandler = (height: number) => {
    setSelectedHeight(height);
  };

  console.log(selectedWidth, selectedHeight);

  return (
    <main style={{ minHeight: "100vh" }}>
      <Header />
      <ProductSelector title="Selectionnez une trappe" trappes={trappes} />
      {selectedTrappe && (
        <>
          <ProductDescription
            title={selectedTrappe?.name || ""}
            description={selectedTrappe?.long_description ?? ""}
            images={selectedTrappe?.images || []}
          />
          <ProductCustomizer
            trappe={selectedTrappe}
            width={selectedWidth ?? 0}
            height={selectedHeight ?? 0}
            onChangeWidth={changeWidthHandler}
            onChangeHeight={changeHeightHandler}
          />
          <PriceOverview />
        </>
      )}
      {/* Code temporaire pour ne pas avoir le fotter au millieu en cas d'absence de trappe */}
      {!selectedTrappe && <div style={{ height: "60vh" }} />}
      <Footer />
    </main>
  );
};

export default Conception;

export const getStaticProps: GetStaticProps<{
  trappes: Trappe[];
}> = async () => {
  const response = await getAllTrappes();
  const responseData = await response.json();
  const trappes = responseData.data;
  console.log(trappes);

  return { props: { trappes } };
};
