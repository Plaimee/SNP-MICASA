import { IActivityData } from "@/@types/activity/IActivity";
import { IFamilyData } from "@/@types/family/IFamily";
import { StatusDetailCard } from "@/components/status-card/StatusCard";
import { ReadActivity } from "@/services/activity/Activity.Services";
import { ReadFamily } from "@/services/family/Family.Services";
import { useAppSelector } from "@/stores/hooks";
import { userData } from "@/stores/reducers/authenReducer";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function StatusPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [activity, setActivity] = useState<IActivityData[]>([]);
  const [data, setData] = useState<IFamilyData | null>(null);
  const user = useAppSelector(userData);

  useEffect(() => {
    if (data?.id) readActivity(data.id);
  }, [data]);

  useEffect(() => {
    if (user?.famCode) {
      readFamily(user?.famCode);
    }
  }, [user]);

  async function readActivity(fam_id: number) {
    setLoading(true);
    const res = await ReadActivity(fam_id);

    setLoading(false);
    if (res && res.statusCode === 200 && res.taskStatus) {
      setActivity(res.data);
    }
  }

  async function readFamily(famCode: string) {
    setLoading(true);
    const res = await ReadFamily(famCode);
    setLoading(false);
    if (res && res.statusCode === 200 && res.taskStatus) {
      setData(res.data);
    }
  }

  return (
    <Fragment>
      {loading ? (
        <i className="fa-solid fa-spinner animate-spin text-[60px]" />
      ) : activity.length === 0 ? (
        <div className="text-gray-500">ไม่มีพบกิจกรรมในระบบ</div>
      ) : (
        <div className="flex flex-wrap pad-main gap-y-3">
          <Link
            to="/family"
            className="flex w-full items-center space-x-3 previous-page"
          >
            <i className="fa-solid fa-arrow-left text-h2"></i>
            <div className="text-body2 font-semibold">ย้อนกลับ</div>
          </Link>
          <div className="flex flex-col w-full justify-center items-center border border-org-main rounded-md p-5">
            <div className="text-h2 font-medium">กิจกรรมทั้งหมด</div>
            <div className="text-h1 font-bold">{activity.length}</div>
          </div>

          <div className="text-body2 font-semibold">รายการกิจกรรม</div>

          {activity.map((values: IActivityData, index: number) => (
            <StatusDetailCard key={index} data={values} />
          ))}
        </div>
      )}
    </Fragment>
  );
}
