import * as Yup from "Yup";
import { IOptionDDL } from "@/@types/global";
import { IFormCreatePost, IPostData } from "@/@types/post/IPost";
import Dropdown from "@/components/dropdown/Dropdown";
import FeedCard from "@/components/feed-card/FeedCard";
import LeaderCard, {
  IDataLeaderCard,
} from "@/components/leader-card/LeaderCard";
import { useAppSelector } from "@/stores/hooks";
import { userData } from "@/stores/reducers/authenReducer";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { postType } from "@/jsondata/global.json";
import { UploadFileSquare } from "@/components/upload-file/UploadFile";
import { TextAreaField } from "@/components/text-field/TextField";
import { CreatePost, ReadAll, ReadById } from "@/services/post/Post.Services";
import AlertMessage from "@/components/notification/AlertMessage";
import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [tabView, setTabView] = useState<number>(1);
  const tabs = [
    { id: 1, name: "หน้าฟีด" },
    { id: 2, name: "อัปโหลด" },
  ];
  // const navigate = useNavigate();

  function switchTabView(tab: number) {
    switch (tab) {
      case 1:
        return <AllPostPage />;
      case 2:
        return <PostByUserId />;
      default:
        break;
    }
  }

  return (
    <div className="pad-main w-full h-auto space-y-3">
      <div className="flex pad-main pb-3 gap-x-2 bg-org-main/10 rounded-md">
        {tabs.map((tab, idx: number) => (
          <button
            key={idx}
            type="button"
            className={`${
              tabView === tab.id ? "bg-org-main text-white" : ""
            } btn-bft w-6/12`}
            onClick={() => setTabView(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      {switchTabView(tabView)}
    </div>
  );
}

export function AllPostPage() {
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
      const sortedData = res.data
        .map((post: IPostData) => ({
          ...post,
          post_likes: Array.isArray(post.post_likes) ? post.post_likes : [],
        }))
        .sort(
          (a: IPostData, b: IPostData) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      setData(sortedData);
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

  return (
    <Fragment>
      <div className="space-y-2">
        <h3 className="text-body2">การแบ่งปัญกิจกรรม</h3>
        {loading ? (
          <i className="fa-solid fa-spinner animate-spin text-[60px]" />
        ) : data.length === 0 ? (
          <div className="text-gray-500">ไม่มีโพสต์ในระบบ</div>
        ) : (
          <div className="wrap-items-center">
            {data.map((values: IPostData, index: number) => (
              <div key={index} className="w-full">
                <FeedCard data={values} mode="default" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-body2">ครอบครัวที่ทำกิจกรรมมากที่สุดในเดือนนี้</h3>
        <div className="w-full">
          {leaders.map((leader: IDataLeaderCard, index: number) => (
            <div key={index} className="w-full">
              <LeaderCard data={leader} />
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export function PostByUserId() {
  const user = useAppSelector(userData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IPostData[]>([]);
  const location = useLocation();
  const { user_id } = location.state || {};

  useEffect(() => {
    if (user_id || user?.id) {
      readPost(user_id ?? user?.id);
    }
  }, [user_id, user]);

  async function readPost(user_id: number) {
    setLoading(true);
    const res = await ReadById(user_id);
    setLoading(false);
    if (res && res.statusCode === 200 && res.taskStatus) {
      const sortedData = res.data
        .map((post: IPostData) => ({
          ...post,
          post_likes: Array.isArray(post.post_likes) ? post.post_likes : [],
        }))
        .sort(
          (a: IPostData, b: IPostData) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      setData(sortedData);
    }
  }

  return (
    <Fragment>
      {isModalOpen && <UploadPost onClose={() => setIsModalOpen(false)} />}
      <div className="space-y-2">
        <button
          type="button"
          className="btn-bfl btn-main"
          onClick={() => setIsModalOpen(true)}
        >
          เพิ่มโพสต์
        </button>
        <div className="text-body2 font-semibold">โพสต์ของคุณ</div>
        {loading ? (
          <i className="fa-solid fa-spinner animate-spin text-[60px]" />
        ) : data.length === 0 ? (
          <div className="text-gray-500">คุณยังไม่มีโพสต์</div>
        ) : (
          <div className="wrap-items-center">
            {data.map((values: IPostData, index: number) => (
              <div key={index} className="w-full">
                <FeedCard data={values} mode="byId" />
              </div>
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
}

export function UploadPost({ onClose }: { onClose: () => void }) {
  const user = useAppSelector(userData);
  const [loading, setLoading] = useState<boolean>(false);

  const validates = Yup.object().shape({
    postType: Yup.string().required("กรุณาเลือกประเภทโพสต์"),
  });

  function createFormData(values: IFormCreatePost) {
    const form = new FormData();

    form.append("user_id", values.user_id.toString());
    form.append("user_name", values.user_name);
    form.append("user_profile", values.user_profile);
    form.append("post_type", values.postType);
    form.append("post_desc", values.postDesc);
    if (values.postImg.file instanceof File) {
      form.append(
        "post_images",
        values.postImg.file,
        values.postImg.filename || "postImg.jpg"
      );
    } else if (
      typeof values.postImg.file === "string" &&
      values.postImg.file.trim()
    ) {
      form.append("post_images", values.postImg.file);
    }

    return form;
  }

  async function submitForm(values: IFormCreatePost) {
    const data = createFormData(values);
    setLoading(true);
    const res = await CreatePost(data);
    console.log(values);
    setLoading(false);
    if (res && res.statusCode === 201 && res.taskStatus) {
      AlertMessage({
        type: "success",
        title: res.message,
      });
    } else {
      AlertMessage({
        type: "warning",
        title: res.message,
      });
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="pad-main bg-white p-4 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-2">สร้างโพสต์ใหม่</h2>
        <Formik
          enableReinitialize
          validationSchema={validates}
          initialValues={{
            user_id: user?.id ?? 0,
            user_name: user?.fName ?? "",
            user_profile: user?.profile ?? "",
            postType: "",
            postDesc: "",
            postImg: {
              file: "",
              filename: "",
            },
            postComment: "",
            postLike: "",
          }}
          onSubmit={(values: IFormCreatePost) => submitForm(values)}
        >
          {({ setFieldValue, values, touched, errors }) => (
            <Form>
              <div className="flex flex-col gap-y-3">
                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-row gap-x-2">
                    <img
                      src={user?.profile}
                      alt=""
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-y-1">
                      <p className="font-medium">{user?.fName}</p>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <Dropdown
                    title="ประเภทโพสต์"
                    options={postType}
                    value={postType.filter((g) => g.id === values.postType)}
                    optionValue="id"
                    optionLabel={(z: IOptionDDL) => z?.name}
                    onChange={(e: IOptionDDL) =>
                      setFieldValue("postType", e.id)
                    }
                    touched={touched.postType}
                    error={errors.postType}
                  />
                </div>
                <div className="w-full rounded-md">
                  <TextAreaField
                    label="รายละเอียด"
                    name="postDesc"
                    id="postDesc"
                    value={values.postDesc}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setFieldValue("postDesc", e.target.value)
                    }
                    rows={3}
                  />
                </div>
                <div className="w-full pad-main">
                  <UploadFileSquare
                    accept=".jpg, .png, .jpeg"
                    clearImage={!values.postImg}
                    onFileChange={(file: File | null) => {
                      if (file) {
                        setFieldValue("postImg.file", file);
                        setFieldValue("postImg.filename", file.name);
                      }
                    }}
                  />
                  <p className="text-red-main">
                    {errors.postImg?.file ? errors.postImg.file : ""}
                  </p>
                </div>
                <div className="flex justify-end space-x-2 mt-3">
                  <button className="btn-bft btn-sub" onClick={onClose}>
                    ยกเลิก
                  </button>
                  <button
                    disabled={loading}
                    type="submit"
                    className="btn-bft btn-main"
                  >
                    {loading ? (
                      <i className="fa-solid fa-spinner animate-spin"></i>
                    ) : (
                      "โพสต์"
                    )}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
