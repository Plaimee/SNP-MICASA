import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import PublicNavigation from "./PublicNavigation";

export default function MainPublicLayout() {
    return (
        <Fragment>
          {/* {auth ? <Fragment>
            <Navigation />
            <main className='containers'>
              <Outlet />
            </main>
          </Fragment> : <p>ไม่พบหน้าจอ</p>} */}
          <PublicNavigation />
          <main className='containers'>
            <Outlet />
          </main>
        </Fragment >
      );
}