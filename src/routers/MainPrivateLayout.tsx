import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import Navigation from "./Navigation";
// import useAuthenticate from './../helpers/Authenticate';

export default function MainPrivateLayout() {
  // const navigate = useNavigate();
  // const auth = useAuthenticate();

  return (
    <Fragment>
      {/* {auth ? <Fragment>
        <Navigation />
        <main className='containers'>
          <Outlet />
        </main>
      </Fragment> : <p>ไม่พบหน้าจอ</p>} */}
      <Navigation />
      <main className='containers'>
        <Outlet />
      </main>
    </Fragment >
  );
}
