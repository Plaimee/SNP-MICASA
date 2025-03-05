import { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/assets/Logo.svg";

export default function PublicNavigation() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const location = useLocation();
  const { pathname } = location;

  const menu = [
    { id: 1, path: "/", name: "หน้าแรก" },
    { id: 1, path: "/login", name: "เข้าสู่ระบบ" },
    { id: 1, path: "/register", name: "สมัครสมาชิก" },
  ];

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
            <Link to="/">
              <img className="flex w-10 h-10" src={Logo} alt="Logo" />
            </Link>

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
                {menu.map((item, i) => (
                  <li className="w-full" key={i}>
                    <Link
                      to={item.path}
                      className={`${
                        pathname === item.path
                          ? "bg-org-main font-semibold text-white"
                          : "text-black"
                      } flex w-full rounded-md p-2`}
                      onClick={() => setShowMenu(false)}
                    >
                      <div className="flex w-full">{item.name}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      )}
    </Fragment>
  );
}
