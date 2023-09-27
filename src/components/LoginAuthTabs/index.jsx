import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LoginForm from "../LoginForm";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./LoginAuthTabs.module.css";
import RegisterForm from "../RegisterForm";

const LoginAuthTabs = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box className={styles["form-block"]}>
      <Box className={styles["main-box"]}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Войти" />
          <Tab
            label="Зарегистрироваться"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          />
        </Tabs>
      </Box>
      <LoginForm value={value} index={0} />

      <RegisterForm value={value} index={1} />
    </Box>
  );
};

export default LoginAuthTabs;
