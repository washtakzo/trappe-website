import Header from "../components/Common/Header/Header";
import Footer from "../components/Common/Footer/Footer";
import Section from "../components/UI/Section/Section";
import PaimentForm from "../components/Checkout/PaimentForm/PaimentForm";

export default function Checkout() {
  return (
    <main
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <Section
        title="Paiment"
        style={{
          flexGrow: "1",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <PaimentForm />
      </Section>
      <Footer />
    </main>
  );
}
