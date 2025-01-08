import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import PublicNavigation from "./PublicNavigation";

export default function MainPublicLayout() {
  return (
    <Fragment>
      <PublicNavigation />
      <main className="containers">
        <Outlet />
      </main>
    </Fragment>
  );
}
