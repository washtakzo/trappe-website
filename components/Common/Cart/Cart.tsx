import React from "react";
import styles from "./Cart.module.css";
import { HiOutlineShoppingBag } from "react-icons/hi";

type Props = {
  itemCount?: number;
  onClick?: () => void;
};

const Cart = ({ itemCount = 0, onClick }: Props) => {
  const isNotificationVisible = itemCount > 0;

  const cartStyle = isNotificationVisible
    ? styles.cart
    : styles.cart + " " + styles["no-after"];

  return (
    <div className={cartStyle} content={itemCount.toString()} onClick={onClick}>
      <HiOutlineShoppingBag className={styles.icon} />
    </div>
  );
};

export default Cart;
