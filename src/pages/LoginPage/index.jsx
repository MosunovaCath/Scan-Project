import { Grid, Hidden } from "@mui/material";
import React from "react";
import styles from "./LoginPage.module.css";
import LoginAuthTabs from "../../components/LoginAuthTabs";

const LoginPage = (props) => {
  return (
    <Grid container justifyContent={"center"}>
      <Grid className={styles["main-text"]} item md={11} lg={7}>
        <h1>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
        <Hidden mdDown>
          <img
            className={styles["men_key"]}
            src="./images/men_key.svg"
            alt="men_key"
          />
        </Hidden>
      </Grid>

      <Grid item sm={12} lg={4}>
        <div className={styles["form-col"]}>
          <img
            className={styles["lock_key"]}
            src="./images/lock.svg"
            alt="lock"
          />
          <LoginAuthTabs />
        </div>
      </Grid>
      <Hidden mdUp>
        <Grid item md={12}>
          <img
            className={styles["men_key"]}
            src="./images/men_key.svg"
            alt="men_key"
          />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default LoginPage;
