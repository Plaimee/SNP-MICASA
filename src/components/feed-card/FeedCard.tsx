import { IPostComment, IPostData, IPostLikes } from "@/@types/post/IPost";
import { UpdateComment, UpdateLike } from "@/services/post/Post.Services";
import { useAppSelector } from "@/stores/hooks";
import { userData } from "@/stores/reducers/authenReducer";
import { ChangeEvent, useState } from "react";
import AlertMessage from "../notification/AlertMessage";
import { Form, Formik } from "formik";
import TextField from "../text-field/TextField";

interface FeedCardProps {
  data: IPostData;
  mode?: "default" | "byId" | "guest";
}

export default function FeedCard({ data, mode = "default" }: FeedCardProps) {
  const user = useAppSelector(userData);
  const [loading, setLoading] = useState<boolean>(false);
  const [likes, setLikes] = useState<IPostLikes[]>(data.post_likes ?? []);
  const isLiked = likes?.some((like) => like.user_id === user?.id);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<IPostComment[]>(
    data.post_comments ?? []
  );

  const formatTimeAgo = (timestamp: string) => {
    const createdDate = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - createdDate.getTime()) / 1000
    );

    if (diffInSeconds < 60) return "เมื่อสักครู่";
    if (diffInSeconds < 3600)
      return `โพสต์เมื่อ ${Math.floor(diffInSeconds / 60)} นาทีที่แล้ว`;
    if (diffInSeconds < 86400)
      return `โพสต์เมื่อ ${Math.floor(diffInSeconds / 3600)} ชั่วโมงที่แล้ว`;
    return `โพสต์เมื่อ ${Math.floor(diffInSeconds / 86400)} วันที่แล้ว`;
  };

  const handleShare = () => {
    if (mode === "guest") return;

    try {
      const shareUrl = encodeURIComponent(window.location.href);
      const postDesc = encodeURIComponent(data.post_desc || "Check this out!");
      const postImage = encodeURIComponent(data.post_images?.[0]?.images || "");

      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${postDesc}&picture=${postImage}`;

      window.open(facebookShareUrl, "_blank", "width=600,height=400");
    } catch (error) {
      console.error("Failed to share:", error);
    }
  };

  const handleLike = async () => {
    if (mode === "guest") return;

    try {
      const currentLikes = Array.isArray(likes) ? likes : [];
      const updatedLikes = isLiked
        ? currentLikes.filter((like) => like.user_id !== user?.id)
        : [...currentLikes, { user_id: user?.id ?? 0 }];

      setLikes(updatedLikes);
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

  async function submitForm(values: IPostComment) {
    try {
      const newComment = {
        user_id: values.user_id,
        user_name: values.user_name,
        user_profile: values.user_profile,
        comment_text: values.comment_text,
        created_at: new Date().toISOString(),
      };

      setComments((prevComments) => [...prevComments, newComment]);
      setLoading(true);

      const res = await UpdateComment(
        data.id,
        user?.id ?? 0,
        user?.fName ?? "",
        user?.profile ?? "",
        values.comment_text
      );
      console.log("API Response:", res);
      setLoading(false);

      if (!res || res.statusCode !== 200) {
        throw new Error("Failed to update comments");
      }

      setComments(
        [...res.comments].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      );
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  }

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
              <span className="text-small text-gray">
                {formatTimeAgo(data.created_at)}
              </span>
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
              onClick={() => {
                if (mode === "guest") {
                  AlertMessage({
                    type: "warning",
                    title: "กรุณาสมัครสมาชิกเพื่อกดไลค์",
                  });
                } else {
                  handleLike();
                }
              }}
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
            <i
              className="fa-regular fa-comment text-h2 text-org-main"
              onClick={() => {
                if (mode === "guest") {
                  AlertMessage({
                    type: "warning",
                    title: "กรุณาสมัครสมาชิกเพื่อแสดงความคิดเห็น",
                  });
                } else {
                  setShowComments(true);
                }
              }}
            ></i>
            <div className="text-body3 items-center">
              {loading ? (
                <i className="fa-solid fa-spinner animate-spin"></i>
              ) : (
                comments?.length ?? 0
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <i
              className="fa-solid fa-share text-h2 text-org-main"
              onClick={() => {
                if (mode === "guest") {
                  AlertMessage({
                    type: "warning",
                    title: "กรุณาสมัครสมาชิกเพื่อแชร์โพสต์",
                  });
                } else {
                  handleShare();
                }
              }}
            ></i>
          </div>
        </div>
      </div>

      {showComments && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end">
          <div className="w-full h-3/5 bg-white rounded-t-lg p-4 flex flex-col relative">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium">Comments</h2>
              <i
                className="fa-solid fa-times text-xl cursor-pointer"
                onClick={() => setShowComments(false)}
              ></i>
            </div>

            <div className="flex-1 overflow-y-auto px-2">
              {comments.length === 0 ? (
                <p className="text-center text-gray">No comments</p>
              ) : (
                comments.map((comment, index) => (
                  <div
                    key={index}
                    className="border-b border-gray pb-2 flex items-start gap-x-2 mt-2"
                  >
                    <img
                      src={comment.user_profile}
                      alt="Commenter Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{comment.user_name}</p>
                      <div className="text-small text-gray">
                        {formatTimeAgo(comment.created_at)}
                      </div>
                      <p className="text-sm ">{comment.comment_text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {mode !== "guest" && (
              <Formik
                enableReinitialize
                initialValues={{
                  user_id: user?.id ?? 0,
                  user_name: user?.fName ?? "",
                  user_profile: user?.profile ?? "",
                  comment_text: "",
                  created_at: "",
                }}
                onSubmit={(values: IPostComment, { resetForm }) => {
                  submitForm(values);
                  resetForm();
                }}
              >
                {({ setFieldValue, values }) => (
                  <Form className="absolute bottom-0 left-0 w-full bg-white p-2 border-t items-center">
                    <div className="flex w-full justify-between gap-x-2">
                      <div className="w-full">
                        <TextField
                          label=""
                          id="comment_text"
                          name="comment_text"
                          placeHolder="เขียนคอมเมนต์..."
                          value={values.comment_text}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setFieldValue("comment_text", e.target.value)
                          }
                        />
                      </div>

                      <button
                        className="btn-bft btn-main"
                        type="submit"
                        disabled={loading || !values.comment_text.trim()}
                      >
                        {loading ? (
                          <i className="fa-solid fa-spinner animate-spin"></i>
                        ) : (
                          "ส่ง"
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
