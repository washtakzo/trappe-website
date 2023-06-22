import React, { useState } from "react";
import styles from "./ProductDescription.module.css";
import Image from "next/image";

type Props = {
  trappe:Trappe;
};

const ProductDescription = ({ trappe }: Props) => {
  const [mainImage, setMainImage] = useState(trappe.images[0]);

  React.useEffect(()=>{
    setMainImage(trappe.images[0])
  },[trappe])

  return (
    <section className={styles["product-description"]}>
      <h2 className={styles.title}>{trappe.name}</h2>
      <div className={styles["images-container"]}>
        <div className={styles["main-image"]}>
          {/*
            dans un require il n'est pas possible de mettre une variable directement
            mais un template literal fonctionne à condition de commencer le chemin en chaine de charactère
            et d'y placer en cours de route la variable. Fonctionnement compliqué qui est dû à un bug qui n'est pas de mon côté  
          */}
          <Image
            src={mainImage}
            className={styles.image}
            fill
            alt={trappe.name}
          />
        </div>
        <div className={styles["other-images"]}>
          {trappe.images.map((imagePath, index) => (
            <div key={index} onClick={() => setMainImage(imagePath)}>
              <Image
                src={imagePath}
                className={styles.image}
                fill
                alt={trappe.name}
              />
            </div>
          ))}
        </div>
      </div>
      <p className={styles.description}>Description : {trappe.longDescription}</p>
    </section>
  );
};

export default ProductDescription;
