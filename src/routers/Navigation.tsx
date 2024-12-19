import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  // ปิดเมนูเมื่อคลิกที่พื้นหลัง
  const handleOutsideClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest(".menu-container") === null) {
      setShowMenu(false);
    }
  };

  return (
    <nav className="relative flex justify-between items-center bg-white w-full pad-main space-x-2">
      <div className="flex items-center">
        <span className="text-xl font-bold text-gray-800">YourApp</span>
      </div>

      <div className="flex w-full border border-org-main rounded-md justify-between">
        <input type="text" placeholder="ค้นหา" className="rounded-md p-1 text-small" />
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
          <span className="block w-6 h-0.5 bg-gray-800"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
        </div>

        {/* Close Icon (X) */}
        <div className={`${!showMenu ? "hidden" : "block"}`}>
          <span
            className="text-lg font-bold cursor-pointer px-[10px]"
            onClick={() => setShowMenu(false)} // ปิดเมนู
          >
            X
          </span>
        </div>
      </button>

      {/* Menu */}
      <div
        className={`${showMenu ? "absolute top-12 left-0 w-full bg-white shadow-md rounded-md z-20 md:hidden" : "hidden"}`}
        aria-hidden="false"
        onClick={handleOutsideClick} // ตรวจจับการคลิกที่พื้นหลัง
      >
        <div className="menu-container">
          <ul className="flex flex-col space-y-4 p-4 text-gray-800">
            <li><NavLink to="/" className="hover:text-blue-500">หน้าแรก</NavLink></li>
            <li><NavLink to="/login" className="hover:text-blue-500">เข้าสู่ระบบ</NavLink></li>
            <li><NavLink to="/register" className="hover:text-blue-500">สมัครสมาชิก</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
