import { IActivityData } from "@/@types/activity/IActivity";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { menu_category, status_type } from "@/jsondata/global.json";

export interface IActivityProps {
  data: IActivityData;
  type?: "pending" | "success" | "failed";
  count?: number;
}

export default function StatusCard({ type, count }: IActivityProps) {
  const initialValues = (() => {
    switch (type) {
      case "success":
        return {
          title: "รายการที่สำเร็จ",
          subTitle: "Success",
          bgColor: "bg-green-main/10",
          textColor: "text-green-main",
        };
      case "failed":
        return {
          title: "รายการที่ไม่สำเร็จ",
          subTitle: "Failed",
          bgColor: "bg-red-main/10",
          textColor: "text-red-main",
        };
      case "pending":
        return {
          title: "กำลังดำเนินการอยู่",
          subTitle: "Pending",
          bgColor: "bg-org-main/10",
          textColor: "text-org-main",
        };
      default:
        return {
          title: "กำลังดำเนินการอยู่",
          subTitle: "Pending",
          bgColor: "bg-org-main/10",
          textColor: "text-org-main",
        };
    }
  })();

  return (
    <Fragment>
      <Link
        to="/status"
        className={`flex flex-row justify-between w-full ${initialValues.bgColor} rounded-md p-3`}
      >
        <div className="flex flex-col space-y-1">
          <span className="text-body3 font-semibold">
            {initialValues.title}
          </span>
          <p className="text-small text-gray">{initialValues.subTitle}</p>
        </div>

        <h3 className={`text-center items-center ${initialValues.textColor}`}>
          {count} กิจกรรม
        </h3>
      </Link>
    </Fragment>
  );
}

export function StatusDetailCard({ data }: IActivityProps) {
  return (
    <Fragment>
      <div
        className={`flex flex-row w-full p-3 items-center justify-between ${
          String(data.status_type) === "1"
            ? "bg-org-main/10"
            : String(data.status_type) === "3"
            ? "bg-red-main/10"
            : "bg-green-main/10"
        }  rounded-md`}
      >
        <div className="flex gap-x-3">
          <img
            src={data.menu.menu_images}
            alt={data.menu.menu_title}
            className="w-10 h-10 object-cover"
          />
          <div className="flex flex-col">
            <div className="text-body1 font-medium">{data.menu.menu_title}</div>
            <div className="text-small">
              (
              {
                menu_category.find((f) => f.id === data.menu.menu_category)
                  ?.name
              }
              )
            </div>
          </div>
        </div>

        <div className="flex h-full gap-x-3 items-center">
          <div className="text-small">
            (
            {
              status_type.find((f) => String(f.id) === String(data.status_type))
                ?.name
            }
            )
          </div>
          {String(data.status_type) === "1" && (
            <Link
              className="flex w-12 justify-center items-center h-full bg-org-main rounded-full"
              to={`/activity`}
              state={{ act_id: data.id }}
            >
              <i className="fa-solid fa-chevron-right text-h2 text-white"></i>
            </Link>
          )}
        </div>
      </div>
    </Fragment>
  );
}
