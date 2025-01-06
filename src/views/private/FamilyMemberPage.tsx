import { Link } from "react-router-dom";

export default function FamilyMemberPage() {
  const families = [
    {
      id: 1,
      famName: "ครอบครัวหมูเด้ง",
      famImg: "",
      members: [
        {
          id: 1,
          nickName: "",
          usrImg: "",
          role: 1,
          hHolder: true,
        },
        {
          id: 2,
          nickName: "",
          usrImg: "",
          role: 1,
        },
        {
          id: 3,
          nickName: "",
          usrImg: "",
          role: 1,
        },
        {
          id: 4,
          nickName: "",
          usrImg: "",
          role: 1,
        },
      ],
    },
  ];

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
            src={families[0].famImg}
            alt={families[0].famName}
            className="w-20 h-20 rounded-full"
          />
          <div className="text-h1 font-semibold">{families[0].famName}</div>
        </div>

        <div className="flex flex-col w-full">
          <div className="text-body2 font-semibold">สมาชิกในครอบครัว</div>
          <div className="">{families[0].members.length}</div>
        </div>
      </div>
    </div>
  );
}
