import FeedCard, { IDataFeedCard } from "@/components/feed-card/FeedCard";
import LeaderCard, {
  IDataLeaderCard,
} from "@/components/leader-card/LeaderCard";
// import MenuCard, { IDataMenuCard } from "@/components/menu-card/MenuCard";
import { useNavigate } from "react-router-dom";

export default function GuestPage() {
  const navigate = useNavigate();
  const feeds = [
    {
      id: 1,
      usrName: "ครอบครัวหมูเด้ง",
      usrImg:
        "https://plus.unsplash.com/premium_photo-1661475916373-5aaaeb4a5393?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      status: "โพสต์เมื่อ 1 วันที่แล้ว",
      image:
        "https://images.unsplash.com/photo-1730304300285-2f8735f48a9d?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "ขนมปังเนยถั่ว",
      description:
        "เซอร์วิสซัพพลายเออร์ไนท์ ไฟลท์ดีพาร์ทเมนท์ตรวจสอบดยุก แบคโฮ มาร์กไฟต์เคส ครัวซอง เยนเดโม เกสต์เฮาส์ปิกอัพ ",
      commentCount: 150,
      likeCount: 7600,
      shareCount: 3,
    },
    {
      id: 2,
      usrName: "ครอบครัวจารย์แดง",
      usrImg:
        "https://plus.unsplash.com/premium_photo-1661475916373-5aaaeb4a5393?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      status: "โพสต์เมื่อ 1 วันที่แล้ว",
      image:
        "https://images.unsplash.com/photo-1730304300285-2f8735f48a9d?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "ขนมปังเนยถั่ว",
      description:
        "เซอร์วิสซัพพลายเออร์ไนท์ ไฟลท์ดีพาร์ทเมนท์ตรวจสอบดยุก แบคโฮ มาร์กไฟต์เคส ครัวซอง เยนเดโม เกสต์เฮาส์ปิกอัพ ",
      commentCount: 150,
      likeCount: 7600,
      shareCount: 3,
    },
    {
      id: 3,
      usrName: "ครอบครัวลีน่าจัง",
      usrImg:
        "https://plus.unsplash.com/premium_photo-1661475916373-5aaaeb4a5393?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      status: "โพสต์เมื่อ 1 วันที่แล้ว",
      image:
        "https://images.unsplash.com/photo-1730304300285-2f8735f48a9d?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "ขนมปังเนยถั่ว",
      description:
        "เซอร์วิสซัพพลายเออร์ไนท์ ไฟลท์ดีพาร์ทเมนท์ตรวจสอบดยุก แบคโฮ มาร์กไฟต์เคส ครัวซอง เยนเดโม เกสต์เฮาส์ปิกอัพ ",
      commentCount: 150,
      likeCount: 7600,
      shareCount: 3,
    },
  ];
  const leaders = [
    {
      id: 1,
      rank: 1,
      activity: 337,
      famName: "ครอบครัวจุ๊มเหม่ง",
      img: "https://plus.unsplash.com/premium_photo-1661475916373-5aaaeb4a5393?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      rank: 2,
      activity: 312,
      famName: "ครอบครัวไข่ขาว",
      img: "https://plus.unsplash.com/premium_photo-1661475916373-5aaaeb4a5393?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      rank: 3,
      activity: 302,
      famName: "ครอบครัวกลูต้า",
      img: "https://plus.unsplash.com/premium_photo-1661475916373-5aaaeb4a5393?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div>
      <div className="h-56 bg-orange-400 p-5 gap-2 bg-[url('../assets/Banner.svg')]">
        <div className="flex items-center space-x-2">
          <span className="text-[32px] font-bold text-white">Micasa</span>
        </div>
        <div className="font-bold text-[20px] text-white py-2">
          เสริมสร้างความสัมพันธ์ในครอบครัวผ่านกิจกรรมสุดพิเศษ
        </div>
        <button
          onClick={() => navigate("/register")}
          className="btn-btf bg-orange-600 text-white rounded-md p-2"
        >
          <h3 className="font-medium text-[16px]">สมัครสมาชิก</h3>
        </button>
      </div>

      <div className="space-y-2 pad-main">
        <h3 className="text-body2">การแบ่งปัญกิจกรรม</h3>
        <div className="wrap-items-center">
          {feeds.map((feed: IDataFeedCard, index: number) => (
            <div key={index} className="w-full">
              <FeedCard data={feed} />
            </div>
          ))}
        </div>
      </div>

      <div className="pad-main">
        <h3 className="text-body2">ครอบครัวที่ทำกิจกรรมมากที่สุดในเดือนนี้</h3>
        <div className="wrap-items-center">
          {leaders.map((leader: IDataLeaderCard, index: number) => (
            <div key={index} className="w-full">
              <LeaderCard data={leader} />
            </div>
          ))}
        </div>
      </div>
      {/* <div className="w-full space-y-2 py-5 px-2">
        <div className="text-2xl">กิจกรรมสุดพิเศษ</div>
        <div className="flex flex-wrap justify-between">
          {bannerMenu.map((menu: IDataMenuCard, index: number) =>
            <div key={index} className="w-6/12 p-2">
              <MenuCard data={menu} />
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
}
