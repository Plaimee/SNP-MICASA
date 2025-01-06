import { useState } from "react";

export interface IMemberList {
  data: IDataMemberList;
}

export interface IDataMemberList {
  id: number;
  nickName: string;
  actAmount: number;
}

export default function MemberList({ data }: IMemberList) {
  const initialColors = (() => {
    switch (data.id) {
      case 1:
        return { bgColor: "bg-org-main/10", textColor: "text-org-main" };
      case 2:
        return { bgColor: "bg-green-main/10", textColor: "text-green-main" };
      case 3:
        return { bgColor: "bg-brown-main/10", textColor: "text-brown-main" };
      default:
        return { bgColor: "bg-gray/10", textColor: "text-gray" };
    }
  })();

  const [bgColor, setBgColor] = useState<string>(initialColors.bgColor);
  const [textColor, setTextColor] = useState<string>(initialColors.textColor);
  return (
    <div
      className={`flex flex-row justify-between text-center w-full p-3 rounded-md ${bgColor}`}
    >
      <div className="text-body1 font-semibold text-black">{data.nickName}</div>
      <div className={`text-h3 font-bold ${textColor}`}>
        {data.actAmount} กิจกรรม
      </div>
    </div>
  );
}
