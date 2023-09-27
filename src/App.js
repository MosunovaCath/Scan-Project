import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Container from "@mui/material/Container";
import LoginPage from "./pages/LoginPage";
import MainHeader from "./components/MainHeader";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import SearchPage from "./pages/SearchPage";
import SearchResultsPage from "./pages/SearchResultsPage";

function App() {
  return (
    <>
      <MainHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/searchResults" element={<SearchResultsPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
