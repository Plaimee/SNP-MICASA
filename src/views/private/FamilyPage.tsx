import { Link } from "react-router-dom"

export default function FamilyPage() {
  return (
    <div className="flex items-center justify-center w-full h-dvh mt-[-60px] pad-main">
      <div className="flex flex-col justify-center items-center w-60 rounded-md shadow-md p-5 text-center space-y-2">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray/10">
          <i className="fa-solid fa-question text-[46px] opacity-50"></i>
        </div>
        <span className="text-body3 font-semibold">ไม่พบกลุ่มครอบครัว</span>
        <p className="text-small text-wrap">เราไม่พบกลุ่มครอบครัวของคุณโปรดสร้างหรือ ค้นหากลุ่มครอบครัวของคุณ</p>

        <div className="w-full space-y-3 pt-3">
          <Link to="/family/create" className="btn-bfl bg-org-main text-white text-body-3">
            สร้างครอบครัว
          </Link>
          <Link to="/" className="btn-bfl border border-org-main text-org-main text-body-3 font-medium">
            เข้าร่วมครอบครัว
          </Link>
        </div>
      </div>
    </div>
  )
}
