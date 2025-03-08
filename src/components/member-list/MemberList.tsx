import { IActivityData } from "@/@types/activity/IActivity";

export interface IMemberListProps {
  data: IActivityData;
}

export default function MemberList({ data }: IMemberListProps) {
  const initialColors = (() => {
    switch (String(data.id)) {
      case "1":
        return { bgColor: "bg-org-main/10", textColor: "text-org-main" };
      case "2":
        return { bgColor: "bg-green-main/10", textColor: "text-green-main" };
      case "3":
        return { bgColor: "bg-brown-main/10", textColor: "text-brown-main" };
      default:
        return { bgColor: "bg-gray/10", textColor: "text-gray" };
    }
  })();

  const activityCount =
    String(data.status_type) === "1" || String(data.status_type) === "3"
      ? 0
      : String(data.status_type).length;

  return (
    <div
      className={`flex flex-row justify-between text-center w-full p-3 rounded-md ${initialColors.bgColor}`}
    >
      <div className="text-body1 font-semibold text-black">
        {data.member.fam_mem_nickName}
      </div>
      <div className={`text-h3 font-bold ${initialColors.textColor}`}>
        {activityCount} กิจกรรม
      </div>
    </div>
  );
}
