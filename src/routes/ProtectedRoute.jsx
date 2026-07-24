import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUser } from "@/store/slices/authSlice";
import RouteLoadingPage from "@/pages/RouteLoadingPage";

export const ProtectedRoute = ({
  children,
  requiredRole = null,
}) => {
  const dispatch = useDispatch();

  const {
    userData: user,
    userStatus,
  } = useSelector((state) => state.userSlice);

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUser());
    }
  }, [dispatch, userStatus]);

  if (
    userStatus === "idle" ||
    userStatus === "loading"
  ) {
    return <RouteLoadingPage />;
  }

  if (
    userStatus === "error" ||
    !user
  ) {
    return <Navigate to="/login" replace />;
  }

  if (
    requiredRole &&
    user.role !== requiredRole
  ) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return children;
};