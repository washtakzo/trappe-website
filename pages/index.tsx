import Head from "next/head";
import { GetStaticProps } from "next";

import Header from "../components/Common/Header/Header";
import SectionIntroduction from "../components/Index/SectionIntroduction/SectionIntroduction";
import SectionMainProducts from "../components/Index/SectionMainProducts/SectionMainProducts";
import Footer from "../components/Common/Footer/Footer";
import SectionLivraison from "../components/Index/SectionLivraison/SectionLivraison";
import SectionInstallation from "../components/Index/SectionInstallation/SectionInstallation";
import SectionOutilConception from "../components/Index/SectionOutilConception/SectionOutilConception";
import { getAllTrappes } from "../utils/http";

export default function Home({ trappes }: { trappes: Trappe[] }) {
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
  const response = await getAllTrappes();
  const responseData = await response.json();
  const trappes = responseData.data;
  console.log(trappes);

  return { props: { trappes } };
};
