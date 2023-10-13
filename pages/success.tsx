import React from "react";

import Header from "../components/Common/Header/Header";
import Footer from "../components/Common/Footer/Footer";

import SectionSuccess from "../components/Success/SectionSuccess/SectionSuccess";

export default function Success() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <SectionSuccess />
      <Footer />
    </main>
  );
}
