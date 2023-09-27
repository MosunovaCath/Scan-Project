import React, { useEffect } from "react";
import { istokenValid } from "../../utils/token";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const PrivateRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  istokenValid()
    .then((data) => {
      if (!data) dispatch(logout());
    })
    .catch((e) => console.log(e));

  return isAuthenticated ? <Outlet /> : <Navigate to={"/"} replace />;
};

export default PrivateRoute;
