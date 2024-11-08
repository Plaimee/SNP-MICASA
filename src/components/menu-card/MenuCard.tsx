
export interface IMenuCard {
  data: IDataMenuCard;
}

export interface IDataMenuCard {
  id: number,
  image: string,
  title: string,
  description: string,
  activityCount: number,
  loveCount: number;
}

export default function MenuCard({ data }: IMenuCard) {
  return (
    <div className="flex flex-col">
      <img src={data.image} alt={data.title} className="object-contain" />
      <h3>{data.title}</h3>
      <p>({data.description})</p>
      <div className="flex">
        <p>love: {data.loveCount}</p>
        <p>activity: {data.activityCount}</p>
      </div>
      <button type="button">ขออนุมัติ</button>
    </div>
  );
}
