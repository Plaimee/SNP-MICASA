import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, Fragment } from "react";
import Navigation from "./Navigation";
import { useAppDispatch } from "@/stores/hooks";
import { loadFromLocalStorage } from "@/stores/reducers/authenReducer";

export default function MainPrivateLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadFromLocalStorage());
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!user || !token) {
      navigate("/");
    }
  });
  return (
    <Fragment>
      <Navigation />
      <main className="containers">
        <Outlet />
      </main>
    </Fragment>
  );
}
