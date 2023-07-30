import React from "react";
import styles from "./ProductSelector.module.css";

import { useRouter } from "next/router";
import Image from "next/image";

import { DUMMY_DATA } from "../../../utils/data";

type Props = {
  title: string;
  trappes: Trappe[];
};

const ProductSelector = ({ title, trappes }: Props) => {
  const router = useRouter();

  const clickHandler =
    (id: string) => (_: React.MouseEvent<HTMLDivElement>) => {
      router.push({ pathname: "/conception", query: { id } });
    };

  return (
    <section>
      <h2 className={"section-title"}>{title}</h2>
      <div className={styles["products-container"]}>
        {trappes.map((trappe) => (
          <div
            key={trappe.name}
            className={styles.product}
            onClick={clickHandler(trappe.id)}
          >
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
