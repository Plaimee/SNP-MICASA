export interface ILeaderCard {
  data: IDataLeaderCard;
}

export interface IDataLeaderCard {
  id: number;
  img: string;
  famName: string;
  rank: number;
  activity: number;
}

export default function LeaderCard({ data }: ILeaderCard) {
  const initialColors = (() => {
    switch (data.rank) {
      case 1:
        return { bgColor: "bg-org-main/10", textColor: "text-org-main" };
      case 2:
        return { bgColor: "bg-green-main/10", textColor: "text-green-main" };
      case 3:
        return { bgColor: "bg-brown-main/10", textColor: "text-brown-main" };
      default:
        return { bgColor: "bg-org-main/10", textColor: "text-org-main" };
    }
  })();

  return (
    <div
      className={`flex flex-row justify-between w-full ${initialColors.bgColor} rounded-md p-3 my-2`}
    >
      <div className="flex space-x-2">
        <img
          src={data.img}
          alt={data.famName}
          className="w-11 h-11 rounded-full object-cover"
        />

        <div className="flex flex-col space-y-1">
          <span
            className={`${data.rank !== 0 ? "text-small text-gray" : "hidden"}`}
          >
            อันดับ {data.rank}
          </span>
          <p className="text-body3 font-medium">{data.famName}</p>
        </div>
      </div>

      {data.activity !== 0 && (
        <h3 className={`text-center items-center ${initialColors.textColor}`}>
          {data.activity} กิจกรรม
        </h3>
      )}
    </div>
  );
}
