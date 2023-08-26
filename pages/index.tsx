import Head from "next/head";
import { GetStaticProps } from "next";

import Header from "../components/Common/Header/Header";
import SectionIntroduction from "../components/Index/SectionIntroduction/SectionIntroduction";
import SectionMainProducts from "../components/Index/SectionMainProducts/SectionMainProducts";
import Footer from "../components/Common/Footer/Footer";
import SectionLivraison from "../components/Index/SectionLivraison/SectionLivraison";
import SectionInstallation from "../components/Index/SectionInstallation/SectionInstallation";
import SectionOutilConception from "../components/Index/SectionOutilConception/SectionOutilConception";
import { getAllTrappes, postTrappe } from "../utils/http";

export default function Home({ trappes }: { trappes: Trappe[] }) {
  console.log({ trappes });

  //TODELETE:test
  const postTrappeHandler = () => {
    const trappeToPost = {
      name: "Trappe Electrique789",
      short_description: "Trappe pour accès éléctrique",
      long_description:
        "Trappe de qualité allemande pour les regards en board de routes",
      min_width: 180,
      max_width: 260,
      min_length: 190,
      max_length: 888,
      height: 13,
      images: [
        "https://in-elec.com/wp-content/uploads/2016/08/ELSA_Regard_1-550x400.jpg",
        "https://fr.jqcomposites.com/uploadfile/202008/25/9ce513ffc4158b0d68f6af970e92a3a2_medium.jpg",
      ],
      prices: [
        { surface: 100, pricePerMetter: 2.0 },
        { surface: 800, pricePerMetter: 1.9 },
        { surface: 1200, pricePerMetter: 1.7 },
      ],
      setup_price: 100,
      shipping_price: 150,
    };

    postTrappe(trappeToPost);
  };

  return (
    <div>
      <Head>
        <title>Trappe Expert</title>
        <meta
          name="description"
          content="Vente et installation de trappes d'accès partout en ile de france"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <button onClick={postTrappeHandler}>POST TRAPPE</button>
        <Header />
        <SectionIntroduction />
        <SectionMainProducts trappes={trappes} />
        <SectionLivraison />
        <SectionOutilConception />
        <SectionInstallation />
      </main>
      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps<{
  trappes: Trappe[];
}> = async () => {
  try {
    const trappes = await getAllTrappes();

    return { props: { trappes } };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }

    return { props: { trappes: [] } };
  }
};
