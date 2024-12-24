export interface IStatusCard {
  data: IDataStatusCard;
}

export interface IDataStatusCard {
  id: number;
  title: string;
  description: string;
  amount: number;
}

export default function StatusCard({ data }: IStatusCard) {
  return (
    <div className="flex flex-row justify-between w-full bg-org-main/10 rounded-md p-3">
      <div className="flex flex-col space-y-1">
        <span className="text-body3 font-semibold">{data.title}</span>
        <p className="text-small text-gray">{data.description}</p>
      </div>

      <h3 className="text-center items-center text-org-main">{data.amount}</h3>
    </div>
  );
}
