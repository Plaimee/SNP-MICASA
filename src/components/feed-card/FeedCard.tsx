import { IPostData, IPostLikes } from "@/@types/post/IPost";
import { UpdateLike } from "@/services/post/Post.Services";
import { useAppSelector } from "@/stores/hooks";
import { userData } from "@/stores/reducers/authenReducer";
import { useState } from "react";

interface FeedCardProps {
  data: IPostData;
  mode?: "default" | "byId" | "guest";
}

export default function FeedCard({ data, mode = "default" }: FeedCardProps) {
  const user = useAppSelector(userData);
  const [loading, setLoading] = useState<boolean>(false);
  const [likes, setLikes] = useState<IPostLikes[]>(data.post_likes ?? []);
  const isLiked = likes?.some((like) => like.user_id === user?.id);
  const handleLike = async () => {
    if (mode === "guest") return;

    try {
      const currentLikes = Array.isArray(likes) ? likes : [];
      const updatedLikes = isLiked
        ? currentLikes.filter((like) => like.user_id !== user?.id)
        : [...currentLikes, { user_id: user?.id ?? 0 }];

      setLikes(updatedLikes);
      console.log(updatedLikes);
      setLoading(true);
      const res = await UpdateLike(data.id, user?.id ?? 0);
      setLoading(false);

      if (!res || res.statusCode !== 200) {
        throw new Error("Failed to update like");
      }
    } catch (error) {
      console.error("Failed to update like:", error);
    }
  };

  return (
    <div className="flex flex-col border border-gray/20 rounded-md shadow-md mb-2">
      <div className="pad-main space-y-3">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-row gap-x-2">
            <img
              src={data.user?.user_profile}
              alt="User Profile"
              className="w-11 h-11 rounded-full object-cover"
            />
            <div className="flex flex-col gap-y-1">
              <p className="font-medium">{data.user?.user_name}</p>
              <span className="text-small text-gray">{data.created_at}</span>
            </div>
          </div>

          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <p className="text-wrap font-medium text-small">{data.post_desc}</p>
        <img
          src={data.post_images?.[0]?.images}
          alt="Post Image"
          className="object-cover w-full h-64 rounded-md"
        />
        <div className="flex items-center gap-x-4 pb-2">
          <div className="flex items-center space-x-2">
            <i
              className={`fa-${
                isLiked ? "solid" : "regular"
              } fa-heart text-h2 text-org-main cursor-pointer`}
              onClick={handleLike}
            ></i>
            <div className="text-body3 items-center">
              {loading ? (
                <i className="fa-solid fa-spinner animate-spin"></i>
              ) : (
                likes?.length ?? 0
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fa-regular fa-comment text-h2 text-org-main"></i>
            <div className="text-body3 items-center">
              {data.post_comments?.length ?? 0}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-share text-h2 text-org-main"></i>
            <div className="text-body3 items-center">
              {data.post_shares ?? 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
