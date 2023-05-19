import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header/Header";
import SectionIntroduction from "../components/SectionIntroduction/SectionIntroduction";
import SectionMainProducts from "../components/SectionMainProducts/SectionMainProducts";
import Footer from "../components/Footer/Footer";
import SectionLivraison from "../components/SectionLivraison/SectionLivraison";
import SectionInstallation from "../components/SectionInstallation/SectionInstallation";

export default function Home() {
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
        <SectionMainProducts />
        <SectionLivraison />
        <SectionInstallation />
      </main>
      <Footer />
    </div>
  );
}
