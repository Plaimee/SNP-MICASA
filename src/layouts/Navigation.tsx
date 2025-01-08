import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "@/assets/Logo.png";
import { useAppDispatch } from "@/stores/hooks";
import { logout } from "@/stores/reducers/authenReducer";

export default function Navigation() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!user || !token) {
      navigate('/');
    }
  });

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
    <nav className="sticky top-0 pb-3 shadow-sm bg-white">
      <div className="flex w-full justify-between pad-main">
        <img className="flex w-10 h-10" src={Logo} alt="Logo" />

        <div
          className={`${pathname === "/home"
            ? "flex w-60 border border-org-main rounded-md"
            : "hidden"
            }`}
        >
          <input
            type="text"
            placeholder="ค้นหา"
            className="w-full rounded-md focus:outline-none p-1 ps-3 text-small"
          />
          <button className="btn-bft btn-main">
            <i className="fa-solid fa-magnifying-glass text-small text-white"></i>
          </button>
        </div>

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
        className={`${showMenu
          ? "absolute top-14 left-0 w-full bg-white shadow-md rounded-md z-20"
          : "hidden"
          }`}
        aria-hidden="false"
        onClick={handleOutsideClick} // ตรวจจับการคลิกที่พื้นหลัง
      >
        <div className="menu-container">
          <ul className="flex flex-col w-full space-y-4 p-4 text-gray-800">
            <li className="w-full">
              <Link to="/home" className={handleActivePage("/home")}>
                <div className="flex w-full">หน้าแรก</div>
              </Link>
            </li>
            <div className="w-full h-0.5 bg-gray/10"></div>
            <li>
              <Link to="/family" className={handleActivePage("/family")}>
                <div className="flex w-full">ครอบครัว</div>
              </Link>
            </li>
            <div className="w-full h-0.5 bg-gray/10"></div>
            <li>
              <Link to="/profile" className={handleActivePage("/profile")}>
                <div className="flex w-full">โปรไฟล์</div>
              </Link>
            </li>
            <div className="w-full h-0.5 bg-gray/10"></div>
            <li>
              <Link to="/" onClick={() => dispatch(logout())}>
                <div className="flex w-full">ออกจากระบบ</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
