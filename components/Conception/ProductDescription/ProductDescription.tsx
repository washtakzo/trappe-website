import React, { useState } from "react";
import styles from "./ProductDescription.module.css";
import Image from "next/image";

type Props = {
  title: string;
  description: string;
  images: string[];
};

const ProductDescription = ({ title, description, images }: Props) => {
  const [mainImage, setMainImage] = useState<string>();

  React.useEffect(() => {
    if (images[0]) {
      setMainImage(images[0]);
    }
  }, [images]);

  if (!mainImage) return null;

  return (
    <section className={styles["product-description"]}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles["images-container"]}>
        <div className={styles["main-image"]}>
          {/*
            dans un require il n'est pas possible de mettre une variable directement
            mais un template literal fonctionne à condition de commencer le chemin en chaine de charactère
            et d'y placer en cours de route la variable. Fonctionnement compliqué qui est dû à un bug qui n'est pas de mon côté  
          */}
          <Image
            src={`${mainImage}`}
            className={styles.image}
            fill
            alt={title}
          />
        </div>
        <div className={styles["other-images"]}>
          {images.map((imagePath, index) => (
            <div key={index} onClick={() => setMainImage(imagePath)}>
              <Image
                src={`${imagePath}`}
                className={styles.image}
                fill
                alt={title}
              />
            </div>
          ))}
        </div>
      </div>
      <p className={styles.description}>Description : {description}</p>
    </section>
  );
};

export default ProductDescription;
