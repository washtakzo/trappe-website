import React from "react";

import styles from "./CartItem.module.css";
import { getTrappePrice } from "../../../utils/functions";
import Image from "next/image";

type Props = {
  product: Product;
};

const CartItem = ({ product }: Props) => {
  const trappePrice = getTrappePrice(
    product.trappe,
    product.width,
    product.height
  );

  const method = product.info?.method;
  const address = product.info?.address;
  const city = product.info?.city;
  const postalCode = product.info?.postalCode;
  const feeText =
    method === "installation"
      ? "Frais d'installation : "
      : "Frais de livraison : ";
  const fee: number =
    method === "installation"
      ? product.trappe.setup_price
      : product.trappe.shipping_price;

  return (
    <div key={product.trappe.id} className={styles["cart__product"]}>
      <div className={styles["cart__product__image-container"]}>
        <Image
          alt={product.trappe.name}
          src={product.trappe.images[0]}
          fill
          className={styles["cart__product__image"]}
        />
      </div>
      <div>
        <h3>{`${product.trappe.name} ${product.width}X${product.height}`}</h3>
        <p>{method === "shipping" ? "Livraison" : "Installation sur site"}</p>
        <p>Adresse : {address}</p>
        <p>Ville : {city}</p>
        <p>Code Postal : {postalCode}</p>
        <p>Materiels : {trappePrice} €</p>
        <p>Quantité : {product.quantity}</p>
        <p>{feeText + fee} €</p>
        <p>Total : {+trappePrice + fee} €</p>
      </div>
    </div>
  );
};

export default CartItem;
