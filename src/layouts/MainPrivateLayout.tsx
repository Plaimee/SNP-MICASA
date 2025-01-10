import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, Fragment } from "react";
import Navigation from "./Navigation";

export default function MainPrivateLayout() {
  const navigate = useNavigate();
  useEffect(() => {
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
