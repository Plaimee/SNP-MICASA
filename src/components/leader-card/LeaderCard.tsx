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
  return (
    <div className="flex flex-row justify-between w-full bg-org-main/10 rounded-md p-3 my-2">
      <div className="flex space-x-2">
        <img
          src={data.img}
          alt={data.famName}
          className="w-11 h-11 rounded-full object-cover"
        />

        <div className="flex flex-col space-y-1">
          <span className="text-small text-gray">อันดับ {data.rank}</span>
          <p className="text-body3 font-medium">{data.famName}</p>
        </div>
      </div>

      <h3 className="text-center items-center text-org-main">
        {data.activity} กิจกรรม
      </h3>
    </div>
  );
}
