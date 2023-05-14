import React from "react";
import styles from "./SectionMainProducts.module.css";
import Image from "next/image";
import CustomButton from "../UI/CustomButton/CustomButton";
import illustration from "../../assets/illu1.jpg";
import ProductOverview from "../ProductOverview/ProductOverview";

const SectionMainProducts = () => {
  return (
    <section>
      <div className={styles.container}>
        <h2 className="section-title">What is included in Coworking X</h2>
        <p className="section-sub-title">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo
          obcaecati beatae fugiat modi, blanditiis quo.
        </p>
        <ProductOverview />
        <ProductOverview />
        <ProductOverview />
        <div style={{ height: "100vh" }}>{/* TODELETE: */}</div>
      </div>
    </section>
  );
};

export default SectionMainProducts;
