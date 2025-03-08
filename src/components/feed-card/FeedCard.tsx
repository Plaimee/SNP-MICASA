import {
  IFormPostUpdate,
  IPostComment,
  IPostData,
  IPostLikes,
} from "@/@types/post/IPost";
import {
  DeletePost,
  UpdateComment,
  UpdateLike,
  UpdatePost,
} from "@/services/post/Post.Services";
import { useAppSelector } from "@/stores/hooks";
import { userData } from "@/stores/reducers/authenReducer";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import AlertMessage from "../notification/AlertMessage";
import { Form, Formik } from "formik";
import TextField, { TextAreaField } from "../text-field/TextField";
import UploadFile from "../upload-file/UploadFile";

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
  const [showOptions, setShowOptions] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const optionsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  function updateFormData(values: IFormPostUpdate) {
    const form = new FormData();

    form.append("user_id", values.user_id.toString());
    form.append("post_desc", values.post_desc);
    if (values.post_images.file instanceof File) {
      form.append(
        "post_images",
        values.post_images.file,
        values.post_images.filename || "post_images.jpg"
      );
    } else if (
      typeof values.post_images.file === "string" &&
      values.post_images.file.trim()
    ) {
      form.append("post_images", values.post_images.file);
    }

    return form;
  }

  async function submitUpdateForm(values: IFormPostUpdate) {
    const formData = updateFormData(values);
    setLoading(true);
    const res = await UpdatePost(formData, data.id);
    setLoading(false);
    if (res && res.statusCode === 201 && res.taskStatus) {
      AlertMessage({
        type: "success",
        title: res.message,
      });
      setShowEditPopup(false);
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
          {mode !== "guest" &&
            String(data.user.user_id) === String(user?.id) && (
              <div className="relative" ref={optionsRef}>
                <i
                  className="fa-solid fa-ellipsis-vertical cursor-pointer"
                  onClick={() => setShowOptions(!showOptions)}
                ></i>
                {showOptions && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
                    <p
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setShowEditPopup(true);
                        setShowOptions(false);
                      }}
                    >
                      แก้ไข
                    </p>
                    <p
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setShowOptions(false);

                        AlertMessage({
                          type: "warning",
                          title: "ลบโพสต์",
                          text: "คุณต้องการลบโพสต์ใช่หรือไม่",
                          showConfirmButton: true,
                          showCancelButton: true,
                          confirmButtonText: "ใช่, ลบเลย",
                          cancelButtonText: "ยกเลิก",
                          focusConfirm: false,
                        }).then(async (result) => {
                          if (result.isConfirmed) {
                            try {
                              const response = await DeletePost(
                                data.id,
                                user?.id ?? 0
                              );
                              if (response && response.statusCode === 200) {
                                AlertMessage({
                                  type: "success",
                                  title: "โพสต์ถูกลบแล้ว",
                                });
                                // Optionally, refresh posts or update state
                              } else {
                                AlertMessage({
                                  type: "error",
                                  title: "เกิดข้อผิดพลาด",
                                  text: "ไม่สามารถลบโพสต์ได้",
                                });
                              }
                            } catch (error) {
                              console.error("Delete failed:", error);
                              AlertMessage({
                                type: "error",
                                title: "เกิดข้อผิดพลาด",
                                text: "ไม่สามารถลบโพสต์ได้",
                              });
                            }
                          }
                        });
                      }}
                    >
                      ลบ
                    </p>
                  </div>
                )}
              </div>
            )}
        </div>

        <p className="text-wrap font-medium text-small">{data.post_desc}</p>

        {showEditPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
              <h2 className="text-lg font-medium mb-4">แก้ไขโพสต์</h2>
              <Formik
                enableReinitialize
                initialValues={{
                  user_id: user?.id ?? 0,
                  post_desc: data.post_desc ?? "",
                  post_images: {
                    file: data.post_images?.[0]?.images ?? "",
                    filename: "",
                  },
                }}
                onSubmit={(values: IFormPostUpdate) => submitUpdateForm(values)}
              >
                {({ setFieldValue, values }) => (
                  <Form className="space-y-3">
                    <TextAreaField
                      label="รายละเอียด"
                      id="post_desc"
                      name="post_desc"
                      value={values.post_desc}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setFieldValue("post_desc", e.target.value)
                      }
                      rows={3}
                    />
                    <div className="w-full">
                      <UploadFile
                        accept=".jpg, .png, .jpeg"
                        initialImage={data.post_images?.[0]?.images ?? ""}
                        clearImage={!values.post_images}
                        onFileChange={(file: File | null) => {
                          if (file) {
                            setFieldValue("post_images.file", file);
                            setFieldValue("post_images.filename", file.name);
                          }
                        }}
                        variant="square"
                      />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        className="btn-bft btn-sub"
                        onClick={() => setShowEditPopup(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn-bft btn-main">
                        Update
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}

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
