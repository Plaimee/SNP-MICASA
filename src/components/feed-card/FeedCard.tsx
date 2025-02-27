export interface IFeedCard {
  data: IDataFeedCard;
}

export interface IDataFeedCard {
  id: number;
  usrName: string;
  usrImg: string;
  status: string;
  image: string;
  title: string;
  description: string;
  commentCount: number;
  likeCount: number;
  shareCount: number;
}

export default function FeedCard({ data }: IFeedCard) {
  return (
    <div className="flex flex-col border border-gray/20 rounded-md shadow-md mb-2">
      <div className="pad-main space-y-3">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-row gap-x-2">
            <img
              src={data.usrImg}
              alt=""
              className="w-11 h-11 rounded-full object-cover"
            />
            <div className="flex flex-col gap-y-1">
              <p className="font-medium">{data.usrName}</p>
              <span className="text-small text-gray">{data.status}</span>
            </div>
          </div>

          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <p className="text-wrap font-medium text-small">({data.description})</p>
        <img
          src={data.image}
          alt={data.title}
          className="object-contain rounded-md"
        />
        <div className="flex items-center gap-x-4 pb-2">
          <div className="flex items-center space-x-2">
            <i className="fa-regular fa-heart text-h2 text-org-main"></i>
            <div className="text-body3 items-center">{data.likeCount}</div>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fa-regular fa-comment text-h2 text-org-main"></i>
            <div className="text-body3 items-center">{data.commentCount}</div>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-share text-h2 text-org-main"></i>
            <div className="text-body3 items-center">{data.shareCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
