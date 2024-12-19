export interface IFeedCard {
    data: IDataFeedCard;
}

export interface IDataFeedCard {
    id: number,
    usrName: string,
    usrImg: string,
    status: string,
    image: string,
    title: string,
    description: string,
    commentCount: number,
    likeCount: number,
    shareCount: number;
}

export default function FeedCard({ data }: IFeedCard) {
    return (
        <div className="flex flex-col border border-gray/20 rounded-md shadow-md mb-2">
            <div className="pad-main space-y-2">
                <div className="flex flex-row w-full space-x-2">
                    <div className="">
                        <img src={data.usrImg} alt="" className="w-11 h-11 rounded-full object-cover" />
                    </div>

                    <div className="flex flex-col justify-between">
                        <p className="font-medium">{data.usrName}</p>
                        <span className="text-[12px] text-gray">{data.status}</span>
                    </div>
                </div>
                <p className="text-wrap font-medium text-small">({data.description})</p>
                <img src={data.image} alt={data.title} className="object-contain rounded-md" />
                <div className="flex space-x-2 pb-2">
                    <p className="text-small"><i className="fa-regular fa-heart text-org-main"></i> {data.likeCount}</p>
                    <p className="text-small"><i className="fa-regular fa-comment text-org-main"></i> {data.commentCount}</p>
                    <p className="text-small"><i className="fa-solid fa-share text-org-main"></i> {data.shareCount}</p>
                </div>
            </div>
        </div>
    );
}