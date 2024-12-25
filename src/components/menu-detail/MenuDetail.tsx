export interface IMenuDetail {
  data: IDataMenuDetail;
}

export interface IDataMenuDetail {
  id: number;
  image: string;
  title: string;
  description: string;
  ingredient: string[];
  htCook: string[];
  time: string;
}

export default function MenuDetail({ data }: IMenuDetail) {
  return (
    <div className="flex flex-col w-full space-y-2">
      <img
        src={data.image}
        alt={data.title}
        className="rounded-md object-cover w-full h-56"
      />
      <div className="text-body2 font-bold">{data.title}</div>
      <div className="flex space-x-2">
        <i className="fa-regular fa-clock text-body2 text-org-main"></i>
        <div className="text-small">ใช้เวลาในการทำ: {data.time} นาที</div>
      </div>

      <div className="text-body2 font-bold">รายละเอียด</div>
      <div className="flex space-x-2">
        <i className="fa-regular fa-file-lines text-body2 text-org-main"></i>
        <div className="text-small text-wrap">{data.description}</div>
      </div>

      <div className="text-body2 font-bold">จัดเตรียมวัตถุดิบ</div>
      <div className="flex space-x-7">
        <i className="fa-solid fa-bowl-food text-body2 text-org-main"></i>
        <ul className="text-small list-disc">
          {data.ingredient.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="text-body2 font-bold">วิธีทำ</div>
      <ul className="text-small list-disc ps-5">
        {data.htCook.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  );
}
