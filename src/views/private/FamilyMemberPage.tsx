/* eslint-disable react-hooks/exhaustive-deps */
import { IFamilyStateLocation } from "@/@types/family/IFamily";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function FamilyMemberPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { famData }: IFamilyStateLocation = location.state || {};

  useEffect(() => {
    if (famData === null) {
      navigate('/family');
    }
  }, [famData]);

  // const families = [
  //   {
  //     id: 1,
  //     famName: "ครอบครัวหมูเด้ง",
  //     famImg: "",
  //     members: [
  //       {
  //         id: 1,
  //         nickName: "",
  //         usrImg: "",
  //         role: 1,
  //         hHolder: true,
  //       },
  //       {
  //         id: 2,
  //         nickName: "",
  //         usrImg: "",
  //         role: 1,
  //       },
  //       {
  //         id: 3,
  //         nickName: "",
  //         usrImg: "",
  //         role: 1,
  //       },
  //       {
  //         id: 4,
  //         nickName: "",
  //         usrImg: "",
  //         role: 1,
  //       },
  //     ],
  //   },
  // ];

  return (
    <div className="flex w-full pad-main">
      <div className="flex flex-col space-y-4">
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
      </div>
    </div>
  );
}
