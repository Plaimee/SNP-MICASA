export interface IMenuCard {
  data: IDataMenuCard;
}

export interface IDataMenuCard {
  id: number;
  image: string;
  title: string;
  description: string;
  time: string;
}

export default function MenuCard({ data }: IMenuCard) {
  return (
    <div className="flex flex-col w-44 space-y-2 border border-org-main rounded-md p-2">
      <img
        src={data.image}
        alt={data.title}
        className="rounded-md object-cover w-full h-20"
      />
      <div className="text-small font-bold">{data.title}</div>
      <div className="text-small">({data.description})</div>
      <div className="flex space-x-2 pb-1">
        <i className="fa-regular fa-clock"></i>
        <div className="text-small">{data.time}</div>
      </div>
      <button className="btn-bfl bg-org-main text-body3 text-white font-medium">
        ดูรายละเอียด
      </button>
    </div>
  );
}
