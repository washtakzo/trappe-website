import React, { useRef, useState } from "react";
import styles from "./ProductCustomizer.module.css";
import { getRectanglePercentages } from "../../../utils/functions/math";

const ProductCustomizer = () => {
  const [width, setWidth] = useState(46);
  const [height, setHeight] = useState(46);

  const heightInputRef = useRef<HTMLInputElement>(null);

  const schemaMesures = getRectanglePercentages(height, width);

  const minWidth = 14;
  const maxWidth = 99;

  const minHeight = 20;
  const maxHeight = 80;

  const changeWidthHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    const newWidth =
      value < minWidth ? minWidth : value > maxWidth ? maxWidth : value;
    setWidth(value);
  };

  const changeHeightHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    const newHeight =
      value < minHeight ? minHeight : value > maxHeight ? maxHeight : value;
    setHeight(value);
  };

  const validateHeightHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    const newHeight =
      value < minHeight ? minHeight : value > maxHeight ? maxHeight : value;
    setHeight(newHeight);
  };

  const validateWidthHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    const newWidth =
      value < minWidth ? minWidth : value > maxWidth ? maxWidth : value;
    setWidth(newWidth);
  };

  return (
    <div className={styles["product-customizer"]}>
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
              min={minWidth}
              max={maxWidth}
              value={width}
              onInput={changeWidthHandler}
            />
            <input
              className={styles["picker-input"]}
              type="number"
              min={minWidth}
              max={maxWidth}
              value={width}
              onInput={changeWidthHandler}
              onBlur={validateWidthHandler}
            />
          </div>
          <div className={styles["picker-container"]}>
            <input
              className={styles["picker-slider"]}
              type="range"
              min={minHeight}
              max={maxHeight}
              value={height}
              onInput={changeHeightHandler}
            />
            <input
              className={styles["picker-input"]}
              type="number"
              min={minHeight}
              max={maxHeight}
              value={height}
              onInput={changeHeightHandler}
              onBlur={validateHeightHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCustomizer;
