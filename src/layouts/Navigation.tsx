import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "@/assets/Logo.svg";
import { useAppDispatch } from "@/stores/hooks";
import { logout } from "@/stores/reducers/authenReducer";

export default function Navigation() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const location = useLocation();
  const { pathname } = location;

  const menu = [
    { id: 1, path: "/home", name: "หน้าแรก" },
    { id: 2, path: "/family", name: "ครอบครัว" },
    { id: 3, path: "/profile", name: "โปรไฟล์" },
    { id: 4, path: "/", name: "ออกจากระบบ" },
  ];

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!user || !token) {
      navigate("/");
    }
  });

  const handleOutsideClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest(".menu-container") === null) {
      setShowMenu(!showMenu);
    }
  };

  return (
    <nav className="sticky top-0 pb-3 shadow-sm bg-white">
      <div className="flex w-full justify-between pad-main">
        <Link to="/home">
          <img className="flex w-10 h-10" src={Logo} alt="Logo" />
        </Link>

        <button
          className="flex justify-center items-center text-center w-10 focus:outline-none"
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
            ? "absolute top-14 left-0 w-full bg-white shadow-md rounded-md z-20"
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
                  className={
                    pathname === item.path
                      ? "flex w-full bg-org-main font-semibold text-white rounded-md p-2"
                      : "text-black"
                  }
                  onClick={() =>
                    item.path === "/" && item.name === "ออกจากระบบ"
                      ? dispatch(logout())
                      : setShowMenu(false)
                  }
                >
                  <div className="flex w-full">{item.name}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
