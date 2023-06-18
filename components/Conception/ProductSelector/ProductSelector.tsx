import React from "react";
import styles from "./ProductSelector.module.css";

import Image from "next/image";

import { DUMMY_DATA } from "../../../utils/data";

type Props = {
  title: string;
};

const ProductSelector = ({ title }: Props) => {
  return (
    <section>
      <h2 className={"section-title"}>{title}</h2>
      <div className={styles["products-container"]}>
        {DUMMY_DATA.map((trappe) => (
          <div key={trappe.name} className={styles.product}>
            <div className={styles["image-container"]}>
              <Image
                src={trappe.images[0]}
                className={styles.image}
                fill
                alt={trappe.name}
              />
            </div>
            <p>{trappe.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSelector;
