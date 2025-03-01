import { IPostData } from "@/@types/post/IPost";
import FeedCard from "@/components/feed-card/FeedCard";
import LeaderCard, {
  IDataLeaderCard,
} from "@/components/leader-card/LeaderCard";
import AlertMessage from "@/components/notification/AlertMessage";
import { ReadAll } from "@/services/post/Post.Services";
import { useEffect, useState } from "react";
// import MenuCard, { IDataMenuCard } from "@/components/menu-card/MenuCard";
import { useNavigate } from "react-router-dom";

export default function GuestPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IPostData[]>([]);

  useEffect(() => {
    readAllPost();
  }, []);

  async function readAllPost() {
    setLoading(true);
    const res = await ReadAll();
    setLoading(false);
    if (res && res.statusCode === 200 && res.taskStatus) {
      const sortedData = res.data.sort(
        (a: IPostData, b: IPostData) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      // Group posts by post_type
      const groupedPosts: Record<string, IPostData[]> = {};
      sortedData.forEach((post: IPostData) => {
        if (!groupedPosts[post.post_type]) {
          groupedPosts[post.post_type] = [];
        }
        groupedPosts[post.post_type].push(post);
      });

      const getRandomPost = (
        postList: IPostData[] | undefined
      ): IPostData | null => {
        if (!postList || postList.length === 0) return null;
        return postList[Math.floor(Math.random() * postList.length)];
      };

      const selectedPosts: IPostData[] = [];
      const typesOrder = ["1", "2", "3"];

      typesOrder.forEach((type) => {
        const randomPost = getRandomPost(groupedPosts[type]);
        if (randomPost) selectedPosts.push(randomPost);
      });

      setData(selectedPosts);
    }
  }

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

  // const shareOnFacebook = () => {
  //   const postText = "นี่คือโพสต์ของฉัน! 🎉";
  //   const imageUrl = "https://yourwebsite.com/image.jpg"; // ต้องเป็น URL ที่เข้าถึงได้
  //   const postUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
  //     imageUrl
  //   )}&quote=${encodeURIComponent(postText)}`;

  //   window.open(postUrl, "_blank");
  // };

  return (
    <div className="pb-3">
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
      {loading}
      <div className="space-y-2 pad-main">
        <h3 className="text-body2">การแบ่งปัญกิจกรรม</h3>
        <div className="wrap-items-center">
          {data.map((values: IPostData, index: number) => (
            <div
              key={index}
              className="w-full"
              onClick={() =>
                AlertMessage({
                  type: "warning",
                  title: "กรุณาสมัครสมาชิก",
                })
              }
            >
              <FeedCard data={values} mode="guest" />
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
    </div>
  );
}
