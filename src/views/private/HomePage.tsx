import MenuCard, { IDataMenuCard } from "@/components/menu-card/MenuCard";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const bannerMenu = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1730304300285-2f8735f48a9d?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "ขนมปังเนยถั่ว",
      description: "เมนูอาหารเช้า",
      activityCount: 150,
      loveCount: 7600
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1730304300285-2f8735f48a9d?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "ขนมปังเนยถั่ว",
      description: "เมนูอาหารเช้า",
      activityCount: 150,
      loveCount: 7600
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1730304300285-2f8735f48a9d?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "ขนมปังเนยถั่ว",
      description: "เมนูอาหารเช้า",
      activityCount: 150,
      loveCount: 7600
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1730304300285-2f8735f48a9d?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "ขนมปังเนยถั่ว",
      description: "เมนูอาหารเช้า",
      activityCount: 150,
      loveCount: 7600
    }
  ];

  return (
    <div>
      <div className="w-full h-56 bg-orange-400 p-5 space-y-5 bg-[url('../assets/Banner.svg')]">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-800">YourApp</span>
        </div>
        <div className="font-bold text-2xl text-white">
          เสริมสร้างความสัมพันธ์ในครอบครัวผ่านกิจกรรมสุดพิเศษ
        </div>
        <button onClick={() => navigate('/register')} className="bg-orange-600 text-white rounded-md p-4">
          <h3>สมัครสมาชิก</h3>
        </button>
      </div>
      <div className="w-full space-y-2 py-5 px-2">
        <div className="text-2xl">กิจกรรมสุดพิเศษ</div>
        <div className="flex flex-wrap justify-between">
          {bannerMenu.map((menu: IDataMenuCard, index: number) =>
            <div key={index} className="w-6/12 p-2">
              <MenuCard data={menu} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
