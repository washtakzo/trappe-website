import React, { useState } from "react";

import styles from "./ProductOverview.module.css";
import Image, { StaticImageData } from "next/image";
import imageExemple from "../../assets/illu1.jpg";
import CustomButton from "../../UI/CustomButton/CustomButton";

type Props = {
  trappe: Trappe;
  onClick: () => void;
};

const ProductOverview = ({ trappe, onClick }: Props) => {
  const [secondaryImageIsVisible, setSecondaryImageIsVisible] = useState(false);

  return (
    <div
      className={styles["product-overview"]}
      onMouseEnter={() => setSecondaryImageIsVisible(true)}
      onMouseLeave={() => setSecondaryImageIsVisible(false)}
      onClick={onClick}
    >
      <div className={styles["image-container"]}>
        <Image
          src={trappe.images[0]}
          fill
          alt="trappe image"
          className={styles.image}
        />
        <Image
          src={trappe.images[1] || trappe.images[0]}
          fill
          alt="trappe image"
          className={styles.image}
          style={{ opacity: secondaryImageIsVisible ? "1" : "0" }}
        />
      </div>
      <div className={styles["text-container"]}>
        <h3 className={styles["text-container__title"]}>Trappe Etanche</h3>
        <p className={styles["text-container__text"] + " text-secondary-600"}>
          {trappe.shortDescription}
        </p>
        <CustomButton
          className={
            styles["text-container__button"] +
            " background-secondary text-primary"
          }
          onClick={onClick}
        >
          See Product
        </CustomButton>
      </div>
    </div>
  );
};

export default ProductOverview;
