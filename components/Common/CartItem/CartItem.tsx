import React from "react";

import styles from "./CartItem.module.css";
import { getTrappePrice } from "../../../utils/functions";
import Image from "next/image";

import { IoAdd, IoRemove } from "react-icons/io5";
import { CardContext } from "../../../store/card-context";

type Props = {
  product: Product;
};

const CartItem = ({ product }: Props) => {
  const cardCtx = React.useContext(CardContext);

  let trappePrice = getTrappePrice(
    product.trappe,
    product.width,
    product.height
  );
  trappePrice = trappePrice * product.quantity;

  const method = product.info?.method;
  const address = product.info?.address;
  const city = product.info?.city;
  const postalCode = product.info?.postalCode;

  const feeText =
    method === "installation"
      ? "Frais d'installation : "
      : "Frais de livraison : ";

  let fee: number =
    method === "installation"
      ? product.trappe.setup_price
      : product.trappe.shipping_price;
  fee = fee * product.quantity;

  const totalPrice = trappePrice + fee;

  return (
    <div key={product.trappe.id} className={styles["cart__product"]}>
      <div>
        <div className={styles["cart__product__image-container"]}>
          <Image
            alt={product.trappe.name}
            src={product.trappe.images[0]}
            fill
            className={styles["cart__product__image"]}
          />
        </div>
        <div className={styles["cart__product__quantity-container"]}>
          <IoRemove
            style={{ cursor: "pointer" }}
            onClick={() => cardCtx.deleteProduct(product)}
          />
          <p className={styles["cart__product__quantity-container__quantity"]}>
            {product.quantity}
          </p>
          <IoAdd
            style={{ cursor: "pointer" }}
            onClick={() => cardCtx.addProduct(product)}
          />
        </div>
      </div>
      <div>
        <h3>{`${product.trappe.name} ${product.width}X${product.height}`}</h3>
        <p>{method === "shipping" ? "Livraison" : "Installation sur site"}</p>
        <p>Adresse : {address}</p>
        <p>Ville : {city}</p>
        <p>Code Postal : {postalCode}</p>
        <p>Materiels : {trappePrice.toFixed(2)} €</p>
        <p>{feeText + fee} €</p>
        <p>Total : {totalPrice.toFixed(2)} €</p>
      </div>
    </div>
  );
};

export default CartItem;
