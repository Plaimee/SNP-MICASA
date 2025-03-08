import { IActivityData } from "@/@types/activity/IActivity";
import {
  ReadActivityById,
  UpdateActivity,
} from "@/services/activity/Activity.Services";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { menu_category } from "@/jsondata/global.json";
import TextField from "@/components/text-field/TextField";
import { userData } from "@/stores/reducers/authenReducer";
import { useAppSelector } from "@/stores/hooks";
import { format } from "date-fns";
import AlertMessage from "@/components/notification/AlertMessage";

export default function ActivityPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [activity, setActivity] = useState<IActivityData | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const location = useLocation();
  const { act_id } = location.state || {};
  const [timer, setTimer] = useState<number>(0);
  const [customTime, setCustomTime] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const user = useAppSelector(userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (act_id) {
      readActivityById(act_id);
    }
  }, [act_id]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  const handleStartTimer = () => {
    if (customTime > 0) {
      setTimer(customTime);
      setIsTimerRunning(true);
    }
  };

  async function readActivityById(act_id: number) {
    setLoading(true);
    const res = await ReadActivityById(act_id);
    setLoading(false);
    if (res && res.statusCode === 200 && res.taskStatus) {
      setActivity(res.data);
    }
  }

  const handleComplete = useCallback(
    async (status: "2" | "3") => {
      if (!activity) return;

      const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
      const formData = new FormData();
      formData.append("completed_at", timestamp);
      formData.append("status_type", status);

      try {
        await UpdateActivity(activity.id, formData);
        setActivity((prev) =>
          prev
            ? { ...prev, completed_at: timestamp, status_type: status }
            : null
        );
        setIsTimerRunning(false);

        AlertMessage({
          type: "success",
          title: "สำเร็จ!",
          text: status === "2" ? "บันทึกสำเร็จแล้ว" : "หมดเวลา",
          showConfirmButton: true,
          confirmButtonText: "ตกลง",
        }).then(() => {
          navigate("/family");
        });
      } catch (error) {
        console.error("Error updating activity:", error);
      }
    },
    [activity, navigate]
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      AlertMessage({
        type: "error",
        title: "⏳ เวลาหมดแล้ว!",
        text: "ระบบบันทึกสถานะเป็นหมดเวลา",
        showConfirmButton: true,
        confirmButtonText: "ตกลง",
      }).then(() => {
        handleComplete("3");
      });
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, handleComplete]);

  return (
    <Fragment>
      {loading ? (
        <i className="fa-solid fa-spinner animate-spin text-[60px]" />
      ) : activity?.id === 0 ? (
        <div className="text-gray-500">ไม่พบกิจกรรมในระบบ</div>
      ) : (
        <div className="flex flex-wrap pad-main gap-y-3">
          <Link
            to="/status"
            className="flex w-full items-center space-x-3 previous-page"
          >
            <i className="fa-solid fa-arrow-left text-h2"></i>
            <div className="text-body2 font-semibold">ย้อนกลับ</div>
          </Link>

          <div className="flex flex-col flex-wrap w-full gap-y-3">
            <img
              src={activity?.menu.menu_images}
              alt={activity?.menu.menu_title}
              className="w-full h-48 object-cover rounded-md"
            />
            <div className="flex gap-x-3 items-center">
              <div className="text-h1 font-semibold">
                {activity?.menu.menu_title}
              </div>
              <div className="text-body3">
                (
                {
                  menu_category.find(
                    (f) => f.id === activity?.menu.menu_category
                  )?.name
                }
                )
              </div>
            </div>

            <div className="text-body3 font-semibold">ผู้รับหน้าที่</div>
            <div className="flex w-full gap-x-3 items-center p-3 bg-org-main/10 rounded-md">
              <img
                src={activity?.member.fam_mem_image}
                alt={activity?.member.fam_mem_nickName}
                className="w-12 rounded-md"
              />
              <div className="text-body2 font-semibold">
                {activity?.member.fam_mem_nickName}
              </div>
            </div>

            {userLocation && (
              <button
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps?q=${userLocation.lat},${userLocation.lon}`,
                    "_blank"
                  )
                }
                className="btn-main btn-bfl"
              >
                <i className="fa-solid fa-map-marker-alt mr-2"></i>
                ค้าหาร้านค้า
              </button>
            )}

            <div className="flex flex-col items-center gap-y-2 rounded-md">
              {isTimerRunning && (
                <div className="text-h1 font-semibold">⏳ {timer} วินาที</div>
              )}

              {!isTimerRunning && (
                <div className="w-full">
                  <TextField
                    label="ตั้งเวลาทำกิจกรรม"
                    name="setTimer"
                    type="number"
                    value={String(customTime)}
                    onChange={(e) => setCustomTime(Number(e.target.value))}
                    placeHolder="ตั้งเวลา (วินาที)"
                  />
                  <button
                    onClick={handleStartTimer}
                    disabled={
                      !activity?.member.fam_mem_id ||
                      customTime <= 0 ||
                      String(user?.id) !== activity?.member.fam_mem_id
                    }
                    className="btn-main btn-bfl mt-2"
                  >
                    เริ่มจับเวลา
                  </button>
                </div>
              )}

              {isTimerRunning && (
                <button
                  onClick={() => handleComplete("2")}
                  disabled={String(user?.id) !== activity?.member.fam_mem_id}
                  className="btn-main btn-bfl"
                >
                  เสร็จสิ้น
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
