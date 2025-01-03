import { useState } from "react";

export interface IMenuCard {
  data: IDataMenuCard;
}

export interface IDataMenuCard {
  id: number;
  image: string;
  title: string;
  menuType: string;
  description: string;
  ingredient: string[];
  htCook: string[];
  time: string;
}

export default function MenuCard({ data }: IMenuCard) {
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const handleOutsideClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest(".detail-container") === null) {
      setShowDetail(false);
    }
  };

  return (
    <div className="flex flex-col w-44 space-y-2 border border-org-main rounded-md p-2">
      <img
        src={data.image}
        alt={data.title}
        className="rounded-md object-cover w-full h-20"
      />
      <div className="text-small font-bold">{data.title}</div>
      <div className="text-small">({data.menuType})</div>
      <div className="flex space-x-2 pb-1">
        <i className="fa-regular fa-clock"></i>
        <div className="text-small">{data.time} นาที</div>
      </div>
      <button
        className="btn-bfl bg-org-main text-body3 text-white font-medium"
        onClick={() => setShowDetail(!showDetail)}
      >
        ดูรายละเอียด
      </button>

      <div
        className={`${
          showDetail
            ? "absolute left-0 top-10 m-3 bg-white shadow-md rounded-md z-20"
            : "hidden"
        }`}
        aria-hidden="false"
        onClick={handleOutsideClick}
      >
        <div className="detail-container">
          <div className="flex flex-col w-full space-y-2 pad-main py-3">
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
            <ul className="text-small list-disc ps-5 pb-3">
              {data.htCook.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>

            <div className="flex w-full space-x-2">
              <button className="btn-bft btn-main w-full">รับภารกิจ</button>
              <button
                className="btn-bft btn-sub w-full"
                onClick={() => setShowDetail(!showDetail)}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
