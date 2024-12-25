import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "@/assets/Logo.png";

export default function Navigation() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const location = useLocation();
  const { pathname } = location;

  // ปิดเมนูเมื่อคลิกที่พื้นหลัง
  const handleOutsideClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest(".menu-container") === null) {
      setShowMenu(false);
    }
  };

  return (
    <nav className="relative flex justify-between items-center bg-white w-full pad-main space-x-2 shadow-sm pb-2">
      <div className="flex items-center w-10 h-10 me-3">
        <img src={Logo} alt="" />
      </div>

      <div
        className={`${
          pathname === "/home"
            ? "flex w-full border border-org-main rounded-md justify-between"
            : "hidden"
        }`}
      >
        <input
          type="text"
          placeholder="ค้นหา"
          className="rounded-md p-1 text-small"
        />
        <button className="btn-btf px-3 bg-org-main rounded-md">
          <i className="fa-solid fa-magnifying-glass text-small text-white"></i>
        </button>
      </div>

      <button
        className="p-2 w-10 h-10 focus:outline-none md:hidden flex items-center justify-center"
        aria-label="Toggle menu"
        onClick={() => setShowMenu(!showMenu)} // สลับสถานะเมนู
      >
        {/* Hamburger Icon */}
        <div className={`${showMenu ? "hidden" : "space-y-1"}`}>
          <i className="fa-solid fa-bars text-h2"></i>
        </div>

        {/* Close Icon (X) */}
        <div className={`${!showMenu ? "hidden" : "block"}`}>
          <span
            className="text-lg font-bold cursor-pointer px-[10px] text-h2 w-10 h-10"
            onClick={() => setShowMenu(false)} // ปิดเมนู
          >
            X
          </span>
        </div>
      </button>

      {/* Menu */}
      <div
        className={`${
          showMenu
            ? "absolute top-12 left-0 w-full bg-white shadow-md rounded-md z-20 md:hidden"
            : "hidden"
        }`}
        aria-hidden="false"
        onClick={handleOutsideClick} // ตรวจจับการคลิกที่พื้นหลัง
      >
        <div className="menu-container">
          <ul className="flex flex-col space-y-4 p-4 text-gray-800">
            <li>
              <NavLink to="/home" className="hover:text-blue-500">
                หน้าแรก
              </NavLink>
            </li>
            <li>
              <NavLink to="/family" className="hover:text-blue-500">
                ครอบครัว
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className="hover:text-blue-500">
                โปรไฟล์
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="hover:text-blue-500">
                ออกจากระบบ
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
