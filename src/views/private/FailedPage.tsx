import { Link } from "react-router-dom";

export default function FailedPage() {
  return (
    <div className="pad-main space-y-3">
      <Link
        to="/family"
        className="flex w-fit items-center space-x-3 previous-page"
      >
        <i className="fa-solid fa-arrow-left text-h2"></i>
        <div className="text-body2 font-semibold">ย้อนกลับ</div>
      </Link>
    </div>
  );
}
