import Box from "@mui/material/Box";

import { useEffect, useState } from "react";

import styles from "./LoginForm.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function LoginForm(props) {
  const { children, value, index, ...other } = props;
  const [error, setError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => validateInputs(formData), []);

  const validateInputs = ({ login, password }) => {
    if (login.length < 2 || password.length < 2) setIsDisabled(true);
    else setIsDisabled(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateInputs(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsDisabled(true);
    const requestData = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const api = "https://gateway.scan-interfax.ru/api/v1/account/login";
    fetch(api, requestData)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error with token");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(login(data));
        navigate("/search");
        setError(false);
      })
      .catch((error) => {
        setError(true);
        setFormData({
          login: formData.login,
          password: "",
        });
      })
      .finally(() => {
        setIsDisabled(false);
      });
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={styles["box"]}>
          <form onSubmit={handleSubmit}>
            <p className={styles["input-label"]}>Логин или номер телефона:</p>
            <input
              type="text"
              name="login"
              className={error ? styles["input-error"] : styles["form-input"]}
              value={formData.login}
              onChange={handleInputChange}
              placeholder=""
              required
            />
            {error && (
              <p className={styles["text-error"]}>Введите корректные данные</p>
            )}
            <p className={styles["input-label"]}>Пароль:</p>
            <input
              className={error ? styles["input-error"] : styles["form-input"]}
              type="password"
              placeholder=""
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {error && (
              <p className={styles["text-error"]}>Неправильный пароль</p>
            )}
            <button
              className={
                isDisabled
                  ? `${styles["form-submit"]} ${styles["btn-disabled"]}`
                  : styles["form-submit"]
              }
              disabled={isDisabled}
              type="submit"
            >
              Войти
            </button>
            <a className={styles["form-link"]} href="#">
              Восстановить пароль
            </a>
            <p className={styles["input-label"]}>Войти через:</p>
            <img
              className={styles["login-service"]}
              src="./images/Google.svg"
              alt="google"
            />
            <img
              className={styles["login-service"]}
              src="./images/Yandex.svg"
              alt="google"
            />
            <img
              className={styles["login-service"]}
              src="./images/Facebook.svg"
              alt="google"
            />
          </form>
        </Box>
      )}
    </div>
  );
}
export default LoginForm;
