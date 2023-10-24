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

  const [selectedWidth, setSelectedWidth] = React.useState<number | undefined>(
    selectedTrappe?.min_width
  );
  const [selectedLength, setSelectedLength] = React.useState<
    number | undefined
  >(selectedTrappe?.min_length);

  /**
   * //FIXME:code a ameliorer
   * tous ces artifice a cause du trappeId qui n'est pas récupéré au premier render
   * si c'était le cas, une simple constante selectedTrappe = trappes.find((trappe) => trappe.id == trappeId)
   * aurait été suffisante et les width et height par défaut aurait été aussi des simple constantes
   * trappe.min_width & trappe.min_length
   */
  React.useEffect(() => {
    const trappe = trappes.find((trappe) => trappe.id == trappeId);
    setSelectedTrappe(trappes.find((trappe) => trappe.id == trappeId));
    setSelectedWidth(trappe?.min_width);
    setSelectedLength(trappe?.min_length);
  }, [trappeId, trappes]);

  // const selectedTrappe = DUMMY_DATA.find((trappe) => trappe.id == trappeId);
  // const selectedTrappe = trappes.find((trappe) => trappe.id == trappeId);

  const changeWidthHandler = (width: number) => {
    setSelectedWidth(width);
  };

  const changeLengthHandler = (height: number) => {
    setSelectedLength(height);
  };

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
            // FIXME: ameliorer le code pour éviter les ?? 0
            //selectedWidth et selectedLength devrait etre set directement sans confusion
            width={selectedWidth ?? 0}
            length={selectedLength ?? 0}
            onChangeWidth={changeWidthHandler}
            onChangeLength={changeLengthHandler}
          />
          <PriceOverview
            trappe={selectedTrappe}
            trappeWidth={selectedWidth ?? 0}
            trappeLength={selectedLength ?? 0}
          />
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
  try {
    const trappes: Trappe[] = await getAllTrappes();
    console.log(trappes);
    return { props: { trappes } };
  } catch (error) {
    return { props: { trappes: [] } };
  }
};
