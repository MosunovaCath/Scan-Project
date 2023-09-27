import React from "react";
import { Grid } from "@mui/material";
import styles from "./TariffCol.module.css";
import MainBtn from "../MainBtn";
import { useSelector } from "react-redux";

const TariffCol = ({ tariff }) => {
  const {
    title,
    desc,
    image,
    price,
    oldPrice,
    headerClassname,
    monthPrice,
    tariffData,
  } = tariff;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div
      style={
        title === "Beginner" && isAuthenticated
          ? {
              boxShadow: "0 0 10px rgba(255, 182, 79, 1)",
              border: "2px solid rgba(255, 182, 79, 1)",
            }
          : {}
      }
      className={styles["tariff-col"]}
    >
      {/* header start>>>>>>> */}
      <div className={`${styles["card-header"]} ${styles[headerClassname]}`}>
        <Grid item>
          <h2 className={styles["tariff-title"]}>{title}</h2>
          <p className={styles["tariff-desc"]}>{desc}</p>
        </Grid>
        <img className={styles["tariff-img"]} src={image} alt="" />
      </div>
      {/*<<<<header end */}

      <Grid className={styles["tariff-body"]} item>
        <div className={styles["tariff-row"]}>
          {title === "Beginner" && isAuthenticated ? (
            <span className={styles["this_tariff"]}>Текущий тариф</span>
          ) : (
            <span style={{ height: "23px" }}></span>
          )}
        </div>

        <Grid>
          <span className={styles["new-price"]}>{price}</span>
          <span className={styles["old-price"]}>{oldPrice}</span>
        </Grid>
        <p
          style={!monthPrice ? { height: "32px" } : {}}
          className={styles["month-price"]}
        >
          {monthPrice}
        </p>

        <h3 className={styles["title-tariff"]}>В тариф входит:</h3>
        <ul className={styles["ul-tariff"]}>
          {tariffData.map((elem, i) => (
            <li className={styles["li-tariff"]} key={i}>
              {elem}
            </li>
          ))}
        </ul>
        <div className={styles["btn-row"]}>
          {title === "Beginner" && isAuthenticated ? (
            <MainBtn
              isLoggedIn={true}
              link={"/somewhere"}
              text="Перейти в личный кабинет"
            />
          ) : (
            <MainBtn link={"/login"} text="Подробнее" />
          )}
        </div>
      </Grid>
    </div>
  );
};

export default TariffCol;
