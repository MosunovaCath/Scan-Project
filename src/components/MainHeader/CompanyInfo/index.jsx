import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { istokenValid } from "../../../utils/token";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./CompanyInfo.module.css";

const CompanyInfo = (props) => {
  const [companyInfo, setCompanyInfo] = useState({});
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);

  const fetchUserData = () => {
    const apiUrl = "https://gateway.scan-interfax.ru/api/v1/account/info";
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    fetch(apiUrl, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка сети");
        }
        return response.json();
      })
      .then((data) => {
        setCompanyInfo(data.eventFiltersInfo);
      })
      .catch((error) => {
        console.error("Произошла ошибка:", error);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    if (istokenValid()) {
      fetchUserData();
    }
  }, [isAuth]);
  return (
    <>
      {loading ? (
        <>
          {" "}
          <CircularProgress />
        </>
      ) : (
        <div className={styles["company-row"]}>
          <p className={styles["company-txt"]}>
            Использовано компаний{" "}
            <span
              className={`${styles["company-number"]} ${styles["company-limit"]}`}
            >
              {companyInfo.companyLimit}
            </span>
          </p>
          <p className={styles["company-txt"]}>
            Лимит по компаниям{" "}
            <span
              className={`${styles["company-number"]} ${styles["company-Count"]}`}
            >
              {companyInfo.usedCompanyCount}
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default CompanyInfo;
