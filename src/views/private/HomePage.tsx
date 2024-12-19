import FeedCard, { IDataFeedCard } from "@/components/feed-card/FeedCard";
// import { useNavigate } from "react-router-dom";

export default function HomePage() {
  // const navigate = useNavigate();
  const feeds = [
    {
      id: 1,
      usrName: "ครอบครัวหมูเด้ง",
      usrImg: "https://plus.unsplash.com/premium_photo-1661475916373-5aaaeb4a5393?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      status: "โพสต์เมื่อ 1 วันที่แล้ว",
      image: "https://images.unsplash.com/photo-1730304300285-2f8735f48a9d?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "ขนมปังเนยถั่ว",
      description: "เซอร์วิสซัพพลายเออร์ไนท์ ไฟลท์ดีพาร์ทเมนท์ตรวจสอบดยุก แบคโฮ มาร์กไฟต์เคส ครัวซอง เยนเดโม เกสต์เฮาส์ปิกอัพ ",
      commentCount: 150,
      likeCount: 7600,
      shareCount: 3,
    },
    {
      id: 2,
      usrName: "ครอบครัวจารย์แดง",
      usrImg: "https://plus.unsplash.com/premium_photo-1661475916373-5aaaeb4a5393?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      status: "โพสต์เมื่อ 1 วันที่แล้ว",
      image: "https://images.unsplash.com/photo-1730304300285-2f8735f48a9d?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "ขนมปังเนยถั่ว",
      description: "เซอร์วิสซัพพลายเออร์ไนท์ ไฟลท์ดีพาร์ทเมนท์ตรวจสอบดยุก แบคโฮ มาร์กไฟต์เคส ครัวซอง เยนเดโม เกสต์เฮาส์ปิกอัพ ",
      commentCount: 150,
      likeCount: 7600,
      shareCount: 3,
    },
    {
      id: 3,
      usrName: "ครอบครัวลีน่าจัง",
      usrImg: "https://plus.unsplash.com/premium_photo-1661475916373-5aaaeb4a5393?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      status: "โพสต์เมื่อ 1 วันที่แล้ว",
      image: "https://images.unsplash.com/photo-1730304300285-2f8735f48a9d?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "ขนมปังเนยถั่ว",
      description: "เซอร์วิสซัพพลายเออร์ไนท์ ไฟลท์ดีพาร์ทเมนท์ตรวจสอบดยุก แบคโฮ มาร์กไฟต์เคส ครัวซอง เยนเดโม เกสต์เฮาส์ปิกอัพ ",
      commentCount: 150,
      likeCount: 7600,
      shareCount: 3,
    }
  ];

  const leaders = [
    {
      id: 1,
      rank: 1,
      score: 337,
      usrName: "ครอบครัวจุ๊มเหม่ง",
      usrImg: "https://plus.unsplash.com/premium_photo-1661475916373-5aaaeb4a5393?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      rank: 2,
      score: 312,
      usrName: "ครอบครัวไข่ขาว",
      usrImg: "https://plus.unsplash.com/premium_photo-1661475916373-5aaaeb4a5393?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id:3,
      rank: 3,
      score: 302,
      usrName: "ครอบครัวกลูต้า",
      usrImg: "https://plus.unsplash.com/premium_photo-1661475916373-5aaaeb4a5393?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="pad-main">
      <div className="flex pad-main pb-3 space-x-2 bg-org-main/10 rounded-md">
        <div className="btn-bft w-full bg-org-main text-white">หน้าฟีด</div>
        <div className="btn-bft w-full">อัปโหลด</div>
      </div>

      <div className="space-y-2">
        <h3 className="text-body2">การแบ่งปัญกิจกรรม</h3>
        <div className="wrap-items-center">
          {feeds.map((menu: IDataFeedCard, index: number) => 
            <div key={index} className="w-full">
              <FeedCard data={menu} /></div>
          )}
        </div>
      </div>

      <div className="">
        <h3 className="text-body2">ครอบครัวที่ทำกิจกรรมมากที่สุดในเดือนนี้</h3>
        <div className="w-full">
          <div className="flex flex-row justify-between bg-org-main/10 rounded-md  p-2 my-2">
            <div className="flex space-x-2">
              <img src={leaders[0].usrImg} alt="" className="w-11 h-11 rounded-full object-cover"/>

              <div className="flex flex-col space-y-1">
                <span className="text-small text-gray">อันดับ {leaders[0].rank}</span>
                <p className="text-body3 font-medium">{leaders[0].usrName}</p>
              </div>
            </div>
                
            <h3 className="text-center items-center text-org-main">{leaders[0].score} กิจกรรม</h3>
          </div>

          <div className="flex flex-row justify-between bg-[#B9C476]/10 rounded-md  p-2 my-2">
            <div className="flex space-x-2">
              <img src={leaders[1].usrImg} alt="" className="w-11 h-11 rounded-full object-cover"/>

              <div className="flex flex-col space-y-1">
                <span className="text-small text-gray">อันดับ {leaders[1].rank}</span>
                <p className="text-body3 font-medium">{leaders[1].usrName}</p>
              </div>
            </div>
                
              <h3 className="text-center items-center text-[#B9C476]">{leaders[1].score} กิจกรรม</h3>
          </div>

          <div className="flex flex-row justify-between bg-[#A68E74]/10 rounded-md  p-2 my-2">
            <div className="flex space-x-2">
              <img src={leaders[2].usrImg} alt="" className="w-11 h-11 rounded-full object-cover"/>

              <div className="flex flex-col space-y-1">
                <span className="text-small text-gray">อันดับ {leaders[2].rank}</span>
                <p className="text-body3 font-medium">{leaders[2].usrName}</p>
              </div>
            </div>
                
            <h3 className="text-center items-center text-[#A68E74]">{leaders[2].score} กิจกรรม</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
