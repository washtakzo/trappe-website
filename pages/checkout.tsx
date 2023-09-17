import styles from "./checkout.module.css";

import Header from "../components/Common/Header/Header";
import Footer from "../components/Common/Footer/Footer";

import SectionResume from "../components/Checkout/SectionResume/SectionResume";
import SectionPaiment from "../components/Checkout/SectionPaiement/SectionPaiment";

export default function Checkout() {
  return (
    <main
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <div className={styles["sections-container"]}>
        <SectionResume />
        <SectionPaiment />
      </div>
      <Footer />
    </main>
  );
}
