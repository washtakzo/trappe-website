import React, { useRef, useState } from "react";
import styles from "./ProductCustomizer.module.css";
import { getRectanglePercentages } from "../../../utils/functions/math";

type Props = {
  trappe:Trappe;
  onChangeWidth:(selectedWidth:number)=>void;
  onChangeHeight:(selectedHeight:number)=>void;
}

const ProductCustomizer = ({trappe, onChangeWidth, onChangeHeight}:Props) => {
  const [width, setWidth] = useState(trappe.minWidth);
  const [height, setHeight] = useState(trappe.minHeight);

  React.useEffect(()=>{
    setWidth(trappe.minWidth);
    setHeight(trappe.minHeight);
  },[trappe])

  const schemaMesures = getRectanglePercentages(height, width);

  const changeWidthHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    const newWidth =
      value < trappe.minWidth ? trappe.minWidth : value > trappe.maxWidth ? trappe.maxWidth : value;
    setWidth(newWidth);
    onChangeWidth(+newWidth);
  };
  
  const changeHeightHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    const newHeight =
    value < trappe.minHeight ? trappe.minHeight : value > trappe.maxHeight ? trappe.maxHeight : value;
    setHeight(newHeight);
    onChangeHeight(+newHeight);
  };

  const validateHeightHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    const newHeight =
      value < trappe.minHeight ? trappe.minHeight : value > trappe.maxHeight ? trappe.maxHeight : value;
    setHeight(newHeight);
  };

  const validateWidthHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    const newWidth =
      value < trappe.minWidth ? trappe.minWidth : value > trappe.maxWidth ? trappe.maxWidth : value;
    setWidth(newWidth);
  };

  return (
    <section className={styles["product-customizer"]}>
      <h2 className={"section-title"}>Trappe sur mesure</h2>
      <div className={styles["customizer-container"]}>
        <div className={styles["blueprint"]}>
          <div className={styles["blueprint__schema-container"]}>
            <p>{width}</p>
            <div></div>
            <div className={styles["blueprint__schema-container__background"]}>
              <div
                className={styles["blueprint__schema"]}
                style={{
                  height: schemaMesures.heightPercentage + "%",
                  width: schemaMesures.widthPercentage + "%",
                }}
              />
            </div>
            <p>{height}</p>
          </div>
        </div>
        <div className={styles["pickers-container"]}>
          <div className={styles["picker-container"]}>
            <input
              className={styles["picker-slider"]}
              type="range"
              min={trappe.minWidth}
              max={trappe.maxWidth}
              value={width}
              onInput={changeWidthHandler}
            />
            <input
              className={styles["picker-input"]}
              type="number"
              min={trappe.minWidth}
              max={trappe.maxWidth}
              value={width}
              onInput={changeWidthHandler}
              onBlur={validateWidthHandler}
            />
          </div>
          <div className={styles["picker-container"]}>
            <input
              className={styles["picker-slider"]}
              type="range"
              min={trappe.minHeight}
              max={trappe.maxHeight}
              value={height}
              onInput={changeHeightHandler}
            />
            <input
              className={styles["picker-input"]}
              type="number"
              min={trappe.minHeight}
              max={trappe.maxHeight}
              value={height}
              onInput={changeHeightHandler}
              onBlur={validateHeightHandler}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCustomizer;
