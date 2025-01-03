import { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/assets/Logo.png";

export default function PublicNavigation() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const location = useLocation();
  const { pathname } = location;

  const handleActivePage = (path: string) => {
    return pathname === path
      ? "flex w-full bg-org-main font-semibold text-white rounded-md p-2"
      : "text-black";
  };

  const handleOutsideClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest(".menu-container") === null) {
      setShowMenu(!showMenu);
    }
  };

  return (
    <Fragment>
      {pathname == "/register/more-detail" ? (
        <div className=""></div>
      ) : (
        <nav className="relative pb-3 shadow-sm bg-white">
          <div className="flex w-full justify-between pad-main">
            <img className="flex w-10 h-10" src={Logo} alt="Logo" />

            <button
              className="flex justify-center items-center text-center w-10 focus:outline-none md:hidden"
              aria-label="Toggle menu"
              onClick={() => setShowMenu(!showMenu)} // สลับสถานะเมนู
            >
              {/* Hamburger Icon */}
              <div className={`${showMenu ? "hidden" : "flex"}`}>
                <i className="fa-solid fa-bars text-h2"></i>
              </div>

              {/* Close Icon (X) */}
              <div className={`${!showMenu ? "hidden" : "flex"}`}>
                <i
                  className="fa-solid fa-x text-h2 cursor-pointer"
                  onClick={() => setShowMenu(false)}
                ></i>
              </div>
            </button>
          </div>

          {/* Menu */}
          <div
            className={`${
              showMenu
                ? "absolute top-14 left-0 w-full bg-white shadow-md rounded-md z-20 md:hidden"
                : "hidden"
            }`}
            aria-hidden="false"
            onClick={handleOutsideClick} // ตรวจจับการคลิกที่พื้นหลัง
          >
            <div className="menu-container">
              <ul className="flex flex-col w-full space-y-4 p-4 text-gray-800">
                <li className="w-full">
                  <Link to="/" className={handleActivePage("/")}>
                    <div className="flex w-full">หน้าแรก</div>
                  </Link>
                </li>
                <div className="w-full h-0.5 bg-gray/10"></div>
                <li>
                  <Link to="/login" className={handleActivePage("/login")}>
                    <div className="flex w-full">เข้าสู่ระบบ</div>
                  </Link>
                </li>
                <div className="w-full h-0.5 bg-gray/10"></div>
                <li>
                  <Link
                    to="/register"
                    className={handleActivePage("/register")}
                  >
                    <div className="flex w-full">สมัครสมาชิก</div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </Fragment>
  );
}
