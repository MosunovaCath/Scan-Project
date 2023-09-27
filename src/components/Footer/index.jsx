import { Grid } from "@mui/material";
import React from "react";
import styles from "./Footer.module.css";

const Footer = (props) => {
  return (
    <Grid
      className={styles["footer"]}
      container
      justifyContent={"space-between"}
    >
      <img src="./images/logo_white.svg" alt="logo" />
      <Grid className={styles["footer-text"]}>
        <p className={styles["f-txt"]}>г. Москва, Цветной б-р, 40 </p>
        <p className={styles["f-txt"]}>+7 495 771 21 11 </p>
        <p className={styles["f-txt"]}>info@skan.ru</p>
        <p className={styles["f-txt"]}>Copyright. 2022</p>
      </Grid>
    </Grid>
  );
};

export default Footer;
