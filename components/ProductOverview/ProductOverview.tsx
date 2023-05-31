import React, { useState } from "react";

import styles from "./ProductOverview.module.css";
import Image, { StaticImageData } from "next/image";
import imageExemple from "../../assets/illu1.jpg";
import CustomButton from "../UI/CustomButton/CustomButton";

type Props = {
  position: number;
  primaryImage: StaticImageData;
  secondaryImage?: StaticImageData;
};

const ProductOverview = ({ position, primaryImage, secondaryImage }: Props) => {
  const [secondaryImageIsVisible, setSecondaryImageIsVisible] = useState(false);

  const positionStyle = position % 2 == 0 ? "row" : "row-reverse";

  return (
    <div
      className={styles["product-overview"]}
      style={{ "--position": positionStyle } as React.CSSProperties}
      onMouseEnter={() => setSecondaryImageIsVisible(true)}
      onMouseLeave={() => setSecondaryImageIsVisible(false)}
    >
      <div className={styles["image-container"]}>
        <Image
          src={primaryImage}
          fill
          alt="trappe image"
          className={styles.image}
        />
        <Image
          src={secondaryImage || primaryImage}
          fill
          alt="trappe image"
          className={styles.image}
          style={{ opacity: secondaryImageIsVisible ? "1" : "0" }}
        />
      </div>
      <div className={styles["text-container"]}>
        <h3 className={styles["text-container__title"]}>Trappe Etanche</h3>
        <p className={styles["text-container__text"] + " text-secondary-600"}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure
          inventore dignissimos, aperiam ex quam sint, labore dolor temporibus
          libero, laborum tenetur sapiente ad voluptatibus minima?
        </p>
        <CustomButton
          className={
            styles["text-container__button"] +
            " background-secondary text-primary"
          }
        >
          See Product
        </CustomButton>
      </div>
    </div>
  );
};

export default ProductOverview;
