import React from "react";
import styles from "./MainBtn.module.css";
import { Link } from "react-router-dom";

const MainBtn = ({ isLoggedIn = false, text, link }) => {
  return (
    <Link
      to={link}
      className={isLoggedIn ? styles["btn-logged"] : styles["main-btn"]}
    >
      {" "}
      {text}
    </Link>
  );
};

export default MainBtn;
