import StatusCard, {
  IDataStatusCard,
} from "@/components/status-card/StatusCard";
import MenuCard from "@/components/menu-card/MenuCard";
import { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "@/assets/Logo.svg";
import MemberList, {
  IDataMemberList,
} from "@/components/member-list/MemberList";
import { ReadFamily } from "@/services/family/Family.Services";
import { IFamilyData } from "@/@types/family/IFamily";
import { useAppSelector } from "@/stores/hooks";
import { userData } from "@/stores/reducers/authenReducer";
import AlertMessage from "@/components/notification/AlertMessage";
import { IMenuData } from "@/@types/menu/IMenu";
import { ReadMenu } from "@/services/menu/Menu.Services";

export default function FamilyPage() {
  const user = useAppSelector(userData);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IFamilyData | null>(null);
  const [menu, setMenu] = useState<IMenuData[]>([]);
  const location = useLocation();
  const { famCode } = location.state || {};

  useEffect(() => {
    readMenu();
  }, []);

  useEffect(() => {
    if (famCode || user?.famCode) {
      readFamily(famCode ?? user?.famCode);
    }
  }, [famCode, user]);

  async function readFamily(famCode: string) {
    setLoading(true);
    const res = await ReadFamily(famCode);
    setLoading(false);
    if (res && res.statusCode === 200 && res.taskStatus) {
      setData(res.data);
    }
  }

  async function readMenu() {
    setLoading(true);
    const res = await ReadMenu();
    setLoading(false);
    if (res && res.statusCode === 200 && res.taskStatus) {
      setMenu(res.data);
    }
  }

  const copyFamCode = () => {
    if (data?.famCode) {
      navigator.clipboard.writeText(data.famCode);
      AlertMessage({
        type: "success",
        title: "คัดลอกรหัสครอบครัวเรียบร้อยแล้ว!",
      });
    }
  };

  const status = [
    {
      id: "pending",
      title: "กำลังดำเนินการอยู่",
      description: "Pending",
      amount: 0,
      path: "/activity/pending",
    },
    {
      id: "success",
      title: "รายการที่สำเร็จ",
      description: "Success",
      amount: 0,
      path: "/activity/success",
    },
    {
      id: "failed",
      title: "รายการไม่สำเร็จ",
      description: "Failed",
      amount: 0,
      path: "/activity/failed",
    },
  ];

  const members = [
    {
      id: 1,
      nickName: "อาจารย์เบียร์",
      actAmount: 17,
    },
    {
      id: 2,
      nickName: "อาจารย์แดง",
      actAmount: 16,
    },
    {
      id: 3,
      nickName: "อาจารย์เบิ้ม",
      actAmount: 15,
    },
    {
      id: 4,
      nickName: "อาจารย์คง",
      actAmount: 14,
    },
  ];

  return (
    <Fragment>
      {loading ? (
        <i className="fa-solid fa-spinner animate-spin text-[60px]" />
      ) : data === null ? (
        <div className="flex items-center justify-center w-full h-dvh mt-[-60px] pad-main">
          <div className="flex flex-col justify-center items-center w-60 rounded-md shadow-md p-5 text-center space-y-2">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray/10">
              <i className="fa-solid fa-question text-[46px] opacity-50"></i>
            </div>
            <span className="text-body3 font-semibold">ไม่พบกลุ่มครอบครัว</span>
            <p className="text-small text-wrap">
              เราไม่พบกลุ่มครอบครัวของคุณ โปรดสร้างหรือ ค้นหากลุ่มครอบครัวของคุณ
            </p>
            <div className="w-full space-y-3 pt-3">
              <Link
                to="/family/create"
                className="btn-bfl bg-org-main text-white text-body-3"
              >
                สร้างครอบครัว
              </Link>
              <Link
                to="/family/join"
                className="btn-bfl border border-org-main text-org-main text-body-3 font-medium"
              >
                เข้าร่วมกลุ่มครอบครัว
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="flex justify-between items-center py-5 bg-gray/10 w-full pad-main">
            <div className="flex space-x-3">
              <img
                className="w-[72px] h-[72px] rounded-full"
                src={data.profile ?? Logo}
                alt="test"
              />
              <div className="flex flex-col">
                <div className="text-body2">สวัสดี</div>
                <div className="text-body1 font-bold">{data.famName}</div>
                <div className="text-small">
                  รหัสครอบครัว - {data.famCode}{" "}
                  <i
                    className="fa-solid fa-copy ml-2 cursor-pointer"
                    onClick={copyFamCode}
                  ></i>
                </div>
              </div>
            </div>
            <i
              className="fa-solid fa-user-group text-h2 cursor-pointer"
              onClick={() =>
                navigate("/family/member", { state: { famData: data } })
              }
            ></i>
          </div>

          <div className="pad-main mb-2">
            <div className="flex justify-between text-center mb-2">
              <div className="text-body2 font-semibold">สถานะกิจกรรม</div>
              <Link to="/activity" className="text-small underline">
                ดูทั้งหมด
              </Link>
            </div>
            <div className="wrap-items-center space-y-2">
              {status.map((status: IDataStatusCard, index: number) => (
                <div key={index} className="w-full">
                  <StatusCard data={status} />
                </div>
              ))}
            </div>
          </div>

          <div className="pad-main space-y-2 mb-2">
            <div className="flex justify-between text-center">
              <div className="text-body2 font-semibold">สำรวจเมนูใหม่</div>
              <Link to="/menu" className="text-small underline">
                ดูทั้งหมด
              </Link>
            </div>
            <div className="flex w-full overflow-x-auto space-x-2 scrollbar-hide">
              {menu.map((values: IMenuData, index: number) => (
                <div key={index} className="flex-shrink-0">
                  <MenuCard data={values} />
                </div>
              ))}
            </div>
          </div>

          <div className="pad-main space-y-2 mb-2">
            <div className="text-body2 font-semibold">สถิติการทำกิจกรรม</div>
            <div className="wrap-items-center space-y-2">
              {members.map((status: IDataMemberList, index: number) => (
                <div key={index} className="w-full">
                  <MemberList data={status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
