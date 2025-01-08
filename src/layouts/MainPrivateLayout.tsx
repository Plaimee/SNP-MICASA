import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import Navigation from "./Navigation";

export default function MainPrivateLayout() {
  return (
    <Fragment>
      <Navigation />
      <main className="containers">
        <Outlet />
      </main>
    </Fragment>
  );
}
