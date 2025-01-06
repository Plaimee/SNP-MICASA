import { useState } from "react";
import { Link } from "react-router-dom";

export interface IStatusCard {
  data: IDataStatusCard;
}

export interface IDataStatusCard {
  id: string;
  title: string;
  description: string;
  amount: number;
  path: string;
}

export default function StatusCard({ data }: IStatusCard) {
  const initialColors = (() => {
    switch (data.id) {
      case "success":
        return { bgColor: "bg-green-main/10", textColor: "text-green-main" };
      case "failed":
        return { bgColor: "bg-red-main/10", textColor: "text-red-main" };
      case "pending":
        return { bgColor: "bg-org-main/10", textColor: "text-org-main" };
      default:
        return { bgColor: "bg-org-main/10", textColor: "text-org-main" };
    }
  })();

  const [bgColor, setBgColor] = useState<string>(initialColors.bgColor);
  const [textColor, setTextColor] = useState<string>(initialColors.textColor);

  return (
    <Link
      to={data.path}
      className={`flex flex-row justify-between w-full ${bgColor} rounded-md p-3`}
    >
      <div className="flex flex-col space-y-1">
        <span className="text-body3 font-semibold">{data.title}</span>
        <p className="text-small text-gray">{data.description}</p>
      </div>

      <h3 className={`text-center items-center ${textColor}`}>
        {data.amount} กิจกรรม
      </h3>
    </Link>
  );
}
