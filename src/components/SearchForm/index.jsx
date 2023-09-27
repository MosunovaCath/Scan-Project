import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setHistogramsError,
  setHistogramsIsLoading,
  setSearchResult,
} from "../../redux/slices/searchSlice";
import { useNavigate } from "react-router-dom";
import styles from "./SearchForm.module.css";
import { fetchData } from "./fetchFunctions";
import {
  setNewsError,
  setNewsIsLoading,
  setSearchNews,
} from "../../redux/slices/searchNewsSlice";
import { Checkbox, Hidden } from "@mui/material";

const SearchForm = (props) => {
  const today = new Date().toISOString().substr(0, 10);
  const [maxDate, setMaxDate] = useState(today);
  const [formData, setFormData] = useState({
    inn: "",
    tonality: "any",
    startDate: "",
    endDate: "",
    limit: "",
    maxFullness: false,
    inBusinessNews: false,
    onlyMainRole: false,
    onlyWithRiskFactors: false,
    excludeTechNews: false,
    excludeAnnouncements: false,
    excludeDigests: false,
  });

  const [formErrors, setFormErrors] = useState({
    inn: "",
    limit: "",
  });
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));

    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "inn":
        const numericValue = value.replace(/\D/g, "");
        if (numericValue.length !== 10) {
          error = "Введите корректные данные";
        }
        break;
      case "limit":
        const parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 1000) {
          error = "Обязательное поле";
        }
        break;
      default:
        break;
    }

    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [fieldName]: error,
    }));
  };

  const formatINN = (value) => {
    const numericValue = value.replace(/\D/g, "");

    let maskedValue = "";
    for (let i = 0; i < numericValue.length; i++) {
      if (i === 2 || i === 5 || i === 8) {
        maskedValue += " ";
      }
      maskedValue += numericValue[i];
    }

    return maskedValue.slice(0, 13);
  };

  const handleINNChange = (event) => {
    const value = event.target.value;
    const formattedValue = formatINN(value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      inn: formattedValue,
    }));

    validateField("inn", formattedValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let hasErrors = false;
    for (const fieldName in formErrors) {
      if (formErrors[fieldName]) {
        hasErrors = true;
        break;
      }
    }

    if (!hasErrors) {
      dispatch(setHistogramsIsLoading(true));
      dispatch(setNewsIsLoading());
      navigate("/searchResults");
      //fetch histograms>>>>>
      fetchData(
        formData,
        "https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms",
        token
      )
        .then((data) => {
          dispatch(setSearchResult(data));
        })
        .catch((e) => {
          dispatch(setHistogramsError());
        });
      //<<<<<<<

      //fetch news ->>>>>
      fetchData(
        formData,
        "https://gateway.scan-interfax.ru/api/v1/objectsearch",
        token
      )
        .then((data) => {
          dispatch(setSearchNews(data.items));
        })
        .catch((e) => dispatch(setNewsError()));
      //<<<<<<<
    }
  };

  return (
    <>
      <form className={styles["form"]} onSubmit={handleSubmit}>
        <div>
          <div className={styles["input-block"]}>
            <label htmlFor="INN-number">
              ИНН компании{" "}
              <sup className={formErrors.inn && styles["text-red"]}>*</sup>
            </label>
            <input
              type="text"
              id="INN-number"
              placeholder="10 цифр"
              name="inn"
              value={formData.inn}
              onChange={handleINNChange}
              className={styles["single-input"]}
              style={
                formErrors.inn
                  ? { boxShadow: "0 0 5px red", borderColor: "red !important" }
                  : {}
              }
            />
            <div className={styles["error-text"]}>{formErrors.inn}</div>
          </div>
          <div className={styles["input-block"]}>
            <label htmlFor="ton-select">Тональность</label>
            <select
              className={styles["single-input"]}
              id="ton-select"
              name="tonality"
              onChange={handleChange}
            >
              <option value="any">Любая</option>
              <option value="negative">Негативная</option>
              <option value="positive">Позитивная</option>
            </select>
          </div>
          <div className={styles["input-block"]}>
            <label htmlFor="doc-count">
              Количество документов в выдаче
              <sup className={formErrors.limit && styles["text-red"]}>*</sup>
            </label>
            <input
              type="number"
              name="limit"
              id="doc-count"
              placeholder="От 1 до 1000"
              value={formData.limit}
              onChange={handleChange}
              className={styles["single-input"]}
              style={
                formErrors.limit
                  ? { boxShadow: "0 0 5px red", borderColor: "red !important" }
                  : {}
              }
            />
            <div className={styles["error-text"]}>{formErrors.limit}</div>
          </div>
          <div className={styles["input-block"]}>
            <label>
              Диапазон поиска <sup>*</sup>
            </label>
            <div className={styles["inputs-row"]}>
              <input
                type="date"
                onChange={handleChange}
                name="startDate"
                label="Basic date picker"
                value={formData.startDate}
                className={styles["date-input"]}
                max={maxDate}
              />
              <input
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                name="endDate"
                label="Basic date picker"
                className={styles["date-input"]}
                max={maxDate}
              />
            </div>
            <Hidden lgUp>
              <div className={styles["btn-block"]}>
                <button className={styles["btn-submit"]} type="submit">
                  Поиск
                </button>
                <p>* Обязательные к заполнению поля</p>
              </div>
            </Hidden>
          </div>
        </div>
        <Hidden lgDown>
          <div className={styles["checkbox-col"]}>
            <div>
              <div>
                <Checkbox
                  type="checkbox"
                  name="maxFullness"
                  onChange={handleChange}
                  id="priz"
                  checkedIcon={
                    <img
                      style={{ height: "24px", width: "24px" }}
                      src="./images/icon.svg"
                      alt="priz"
                    />
                  }
                />

                <label
                  style={formData["maxFullness"] ? {} : { opacity: 0.5 }}
                  htmlFor="priz"
                >
                  Признак максимальной полноты
                </label>
              </div>
              <div>
                <Checkbox
                  type="checkbox"
                  name="inBusinessNews"
                  onChange={handleChange}
                  id="upom"
                  checkedIcon={
                    <img
                      style={{ height: "24px", width: "24px" }}
                      src="./images/icon.svg"
                      alt="priz"
                    />
                  }
                />
                <label
                  style={formData["inBusinessNews"] ? {} : { opacity: 0.5 }}
                  htmlFor="upom"
                >
                  Упоминания в бизнес-контексте
                </label>
              </div>
              <div>
                <Checkbox
                  type="checkbox"
                  name="onlyMainRole"
                  onChange={handleChange}
                  id="glav"
                  checkedIcon={
                    <img
                      style={{ height: "24px", width: "24px" }}
                      src="./images/icon.svg"
                      alt="priz"
                    />
                  }
                />
                <label
                  style={formData["onlyMainRole"] ? {} : { opacity: 0.5 }}
                  htmlFor="glav"
                >
                  Главная роль в публикации
                </label>
              </div>
              <div>
                <Checkbox
                  type="checkbox"
                  name="onlyWithRiskFactors"
                  onChange={handleChange}
                  id="publ"
                  checkedIcon={
                    <img
                      style={{ height: "24px", width: "24px" }}
                      src="./images/icon.svg"
                      alt="priz"
                    />
                  }
                />
                <label
                  style={
                    formData["onlyWithRiskFactors"] ? {} : { opacity: 0.5 }
                  }
                  htmlFor="publ"
                >
                  Публикации только с риск-факторами
                </label>
              </div>
              <div>
                <Checkbox
                  type="checkbox"
                  name="excludeTechNews"
                  onChange={handleChange}
                  id="tech"
                  checkedIcon={
                    <img
                      style={{ height: "24px", width: "24px" }}
                      src="./images/icon.svg"
                      alt="priz"
                    />
                  }
                />
                <label
                  style={formData["excludeTechNews"] ? {} : { opacity: 0.5 }}
                  htmlFor="tech"
                >
                  Включать технические новости рынков
                </label>
              </div>
              <div>
                <Checkbox
                  type="checkbox"
                  name="excludeAnnouncements"
                  onChange={handleChange}
                  id="calen"
                  checkedIcon={
                    <img
                      style={{ height: "24px", width: "24px" }}
                      src="./images/icon.svg"
                      alt="priz"
                    />
                  }
                />
                <label
                  style={
                    formData["excludeAnnouncements"] ? {} : { opacity: 0.5 }
                  }
                  htmlFor="calen"
                >
                  Включать анонсы и календари
                </label>
              </div>
              <div>
                <Checkbox
                  type="checkbox"
                  name="excludeDigests"
                  onChange={handleChange}
                  id="news"
                  checkedIcon={
                    <img
                      style={{ height: "24px", width: "24px" }}
                      src="./images/icon.svg"
                      alt="priz"
                    />
                  }
                />
                <label
                  style={formData["excludeDigests"] ? {} : { opacity: 0.5 }}
                  htmlFor="news"
                >
                  Включать сводки новостей
                </label>
              </div>
            </div>
            <div className={styles["btn-block"]}>
              <button
                disabled={formErrors.inn && formErrors.limit}
                className={styles["btn-submit"]}
                style={
                  formErrors.inn === "" && formErrors.limit === ""
                    ? {}
                    : { opacity: 0.3 }
                }
                type="submit"
              >
                Поиск
              </button>
              <p className={styles["text"]}>* Обязательные к заполнению поля</p>
            </div>
          </div>
        </Hidden>
      </form>
    </>
  );
};

export default SearchForm;
