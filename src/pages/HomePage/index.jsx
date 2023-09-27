import React from "react";
import styles from "./HomePage.module.css";
import { Checkbox, Grid } from "@mui/material";
import MainCarousel from "../../components/MainCarousel";
import TariffRow from "../../components/TariffRow";
import MainBtn from "../../components/MainBtn";
import { useSelector } from "react-redux";

const HomePage = (props) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <Grid container>
        <Grid className={styles["main-block"]} item xs={12} md={12} lg={6}>
          <h1 className={styles["main_txt"]}>
            сервис по поиску публикаций о компании по его ИНН
          </h1>
          <p className={styles["title"]}>
            Комплексный анализ публикаций, получение данных в формате PDF на
            электронную почту.
          </p>
          <div className={styles["btn-row"]}>
            {isAuth && <MainBtn link={"/search"} text={"Запросить данные"} />}
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <div className={styles["img-block"]}>
            <img src="./images/home_image.svg" alt="home_image" />
          </div>
        </Grid>
      </Grid>
      <Grid>
        <h1 className={styles["txt-carousel"]}>Почему именно мы</h1>
      </Grid>
      <MainCarousel />
      <Grid item xs={12} md={12} lg={6}>
        <img className={styles["main-img"]} src="./images/man.svg" alt="man" />
      </Grid>
      <TariffRow />
    </>
  );
};

export default HomePage;
