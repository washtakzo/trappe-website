import React from "react";
import styles from "./Section.module.css";

type Props = {
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  style?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
};

const Section = ({
  children,
  title,
  subTitle,
  className,
  titleClassName,
  contentClassName,
  style,
  contentStyle,
}: Props) => {
  return (
    <section className={styles.section + " " + className} style={style}>
      <div className={styles.container}>
        <h2 className={titleClassName + " " + "section-title"}>{title}</h2>
        {subTitle && <p className="section-sub-title">{subTitle}</p>}
        <div
          className={styles.content + " " + contentClassName}
          style={contentStyle}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
