import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleOutsideClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest(".detail-container") === null) {
      setShowDetail(showDetail);
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
            ? "absolute top-1/4 left-0 mx-3 bg-white shadow-md rounded-md z-20"
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
              <button
                onClick={() => navigate("/activity/pending")}
                className="btn-bft btn-main w-full"
              >
                รับภารกิจ
              </button>
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

export function MenuDetailCard({ data }: IMenuCard) {
  const [showRecipeDetail, setShowRecipeDetail] = useState<boolean>(false);
  return (
    <div className="flex flex-col w-full space-y-2 py-3">
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

      <div className="flex items-center justify-between">
        <div className="text-body2 font-bold">รายละเอียด</div>
        <button
          className="flex justify-center items-center text-center w-10 focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setShowRecipeDetail(!showRecipeDetail)} // สลับสถานะเมนู
        >
          {/* Caret Down Icon (v) */}
          <div className={`${showRecipeDetail ? "hidden" : "flex"}`}>
            <i
              className="fa-solid fa-caret-up cursor-pointer"
              onClick={() => setShowRecipeDetail(showRecipeDetail)}
            ></i>
          </div>

          {/* Caret Up Icon (^) */}
          <div className={`${!showRecipeDetail ? "hidden" : "flex"}`}>
            <i
              className="fa-solid fa-caret-down cursor-pointer"
              onClick={() => setShowRecipeDetail(showRecipeDetail)}
            ></i>
          </div>
        </button>
      </div>

      {showRecipeDetail && (
        <div className="">
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
        </div>
      )}
    </div>
  );
}

export function PendingMenuCard({ data }: IMenuCard) {
  return (
    <div className="flex items-center justify-between w-full bg-org-main/10 rounded-md pad-main pb-3">
      <div className="flex flex-row items-center space-x-3">
        <img
          className="w-12 h-12 rounded-md"
          src={data.image}
          alt={data.title}
        />
        <div className="text-body3 font-semibold">{data.title}</div>
        <div className="text-small text-gray">({data.menuType})</div>
      </div>

      <i className="fa-solid fa-chevron-right text-h2"></i>
    </div>
  );
}
