/* eslint-disable react-hooks/exhaustive-deps */
import { IFamilyMember, IFamilyStateLocation } from "@/@types/family/IFamily";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { familyRole } from "@/jsondata/global.json";
import { useAppSelector } from "@/stores/hooks";
import { userData } from "@/stores/reducers/authenReducer";

export default function FamilyMemberPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector(userData);
  const { famData }: IFamilyStateLocation = location.state || {};

  useEffect(() => {
    if (famData === null) {
      navigate('/family');
    }
  }, [famData]);

  return (
    <div className="flex w-full pad-main">
      <div className="flex flex-col space-y-4 w-full">
        <Link
          to="/family"
          className="flex flex-row w-full items-center space-x-2"
        >
          <i className="fa-solid fa-arrow-left text-h2"></i>
          <div className="text-body2 font-semibold">โปรไฟล์ครอบครัว</div>
        </Link>

        <div className="flex flex-row w-full items-center space-x-3">
          <img
            src={famData?.profile ?? ""}
            alt={famData?.famName ?? ""}
            className="w-20 h-20 rounded-full"
          />
          <div className="text-h1 font-semibold">{famData?.famName ?? ""}</div>
        </div>

        <div className="flex flex-col w-full">
          <div className="text-body2 font-semibold">สมาชิกในครอบครัว</div>
          <div className="">{famData?.famMember.length ?? 0}</div>
        </div>
        {famData && famData.famMember.length > 0 && famData.famMember.map((mem: IFamilyMember, idx: number) =>
          <div key={idx} className="p-3 border border-gray rounded-[10px]">
            <div className="flex items-center gap-x-2 justify-between">
              <div className="flex items-center gap-x-2">
                <img src={mem.usrImg} alt="" className="w-20 h-20 rounded-full" />
                <div className="flex flex-col">
                  <h3>{mem.nickName}</h3>
                  <p>{familyRole.find(f => f.id === mem.roleId)?.name} {idx === 0 && "(Admin)"}</p>
                </div>
              </div>
              <div className={`${user?.id === parseInt(famData?.famMember[0].id) ? "flex gap-x-2" : "hidden"}`}>
                <button type="button" className="btn-bft btn-main"><i className="fa-solid fa-pen" /></button>
                <button type="button" className="btn-bft btn-sub"><i className="fa-solid fa-trash" /></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
