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
  //TODO:TODELETE:
  console.log("test vercel : ");
  console.log(process.env.API_BASE_URL);
  console.log({ trappes });
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
  try {
    const trappes = await getAllTrappes();

    console.log("no error getAllTrappes : ");
    console.log({ trappes });
    console.log("no error getAllTrappes --------- ");

    return { props: { trappes } };
  } catch (error) {
    console.log("ERROR ! --------- ");
    if (error instanceof Error) {
      console.log(error.message);
    }

    return { props: { trappes: [] } };
  }
};
