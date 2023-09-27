import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MainHeader.module.css";
import { Grid, Hidden } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import CompanyInfo from "./CompanyInfo";

const MainHeader = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated); //?
  const token = useSelector((state) => state.auth.token); //?
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useDispatch();

  const openMobileMenu = () => {
    let scrollDsb = isOpened ? "auto" : "hidden";

    document.body.style.overflow = scrollDsb;

    setIsOpened(!isOpened);
  };
  return (
    <Grid
      className={styles["header"]}
      container
      justifyContent={"space-between"}
    >
      <Link to="/">
        <img src="./images/logo_color.svg" alt="logo" />
      </Link>
      <Hidden mdDown>
        <Grid item>
          <ul className={styles["nav-list"]}>
            <li className={styles["nav-item"]}>
              <Link to="/">Главная</Link>
            </li>
            <li className={styles["nav-item"]}>
              <Link to="/">Тарифы</Link>
            </li>
            <li className={styles["nav-item"]}>
              <Link to="/">FAQ</Link>
            </li>
          </ul>
        </Grid>
      </Hidden>

      {isAuth ? (
        <>
          <CompanyInfo />
          <Hidden mdDown>
            <Grid className={styles["header-logout"]}>
              <Grid item className={styles["logout-nav"]}>
                <p>Алексей А.</p>
                <button
                  className={styles["logout-btn"]}
                  onClick={() => dispatch(logout())}
                >
                  Выйти
                </button>
              </Grid>
              <img src="./images/Avatar.svg" alt="avatar" />
            </Grid>
          </Hidden>
        </>
      ) : (
        <Hidden mdDown>
          <Grid item>
            <Link className={styles["signup-btn"]}>Зарегистрироваться</Link>
            <Link to={"/login"} className={styles["login-btn"]}>
              Войти
            </Link>
          </Grid>
        </Hidden>
      )}

      <div
        className={isOpened ? styles["mobile-nav"] : styles["mobile-nav-dsb"]}
      >
        <div className={styles["burger-menu"]}>
          <div
            onClick={() => openMobileMenu()}
            className={styles["burger-items"]}
          >
            <Link to={"/"} className={styles["burger-i"]}>
              Главная
            </Link>
            <Link className={styles["burger-i"]}>Тарифы</Link>
            <Link className={styles["burger-i"]}>FAQ</Link>
          </div>
          <div
            onClick={() => openMobileMenu()}
            className={styles["burger-signup"]}
          >
            <Link className={styles["signup-btn"]}>Зарегистрироваться</Link>
            <Link to={"/login"} className={styles["login-btn"]}>
              Войти
            </Link>
          </div>
        </div>
      </div>
      <Hidden mdUp>
        <MenuIcon onClick={() => openMobileMenu()} />
      </Hidden>
    </Grid>
  );
};

export default MainHeader;
