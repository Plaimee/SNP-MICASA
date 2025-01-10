import { useNavigate } from "react-router-dom";

export interface IAlert {
  data: IDataAlert;
}

export interface IDataAlert {
  icon: string;
  title: string;
  description: string;
  btnText: string[];
}

export default function Alert({ data }: IAlert) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center w-60 rounded-md shadow-md p-5 text-center space-y-2">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray/10">
        <i className={`${data.icon} text-h1 opacity-50`}></i>
      </div>
      <span className="text-body3 font-semibold">{data.title}</span>
      <p className="text-small text-wrap">{data.description}</p>
      <div className="flex w-full space-x-2 pt-3">
        <button
          onClick={() => navigate("/family/create")}
          className="btn-bfl btn-base bg-org-main text-white text-body-3"
        >
          {data.btnText[0]}
        </button>
        <button
          onClick={() => navigate("/family/join")}
          className="btn-bfl btn-base border border-org-main text-org-main text-body-3 font-medium"
        >
          {data.btnText[1]}
        </button>
      </div>
    </div>
  );
}
