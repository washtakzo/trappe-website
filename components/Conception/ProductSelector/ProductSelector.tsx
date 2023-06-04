import React from "react";
import styles from "./ProductSelector.module.css";

import Image from "next/image";

type Props = {
  title: string;
  customizableProducts: CustomizableProduct[];
};

const ProductSelector = ({ title, customizableProducts }: Props) => {
  return (
    <section>
      <h2 className={"section-title"}>{title}</h2>
      <div className={styles["products-container"]}>
        {customizableProducts.map((product) => (
          <div key={product.title} className={styles.product}>
            <div className={styles["image-container"]}>
              <Image
                src={require("../../../assets/" + product.image)}
                className={styles.image}
                fill
                alt={product.title}
              />
            </div>
            <p>{product.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSelector;
