import { useNavigate } from "react-router-dom";


export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-orange-400 w-full h-screen">
      <div className="w-full h-1/4"></div>
      <div className="w-full h-3/4 bg-white rounded-2xl p-5 space-y-5">
        <div className="space-y-2">
          <div className="text-2xl font-b">สมัครสมาชิก</div>
          <div className="text-base">ยินดีต้อนรับ! สร้างบัญชีของคุณกับเราที่นี่</div>
        </div>
        <form className="space-y-5">
          <div className="space-y-0">
            <label className="block text-gray-700 text-base font-bold mb-2"> Email </label>
            <input
              className="shadow appearance-none border rounded w-full p-3 border-orange-400 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="กรอกอีเมล"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-center">
              <label className="block text-gray-700 text-base font-bold"> Password </label>
            </div>

            <input
              className="shadow appearance-none border border-orange-400 rounded w-full p-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="กรอกรหัสผ่าน"
            />
          </div>
          <div className="flex items-center">
            <button type="button" onClick={() => navigate('/register/more-detail')} className="bg-orange-400 hover:bg-orange-700 text-white font-bold p-3 rounded-md focus:outline-none focus:shadow-outline w-full">
              ถัดไป
            </button>
          </div>
        </form>

        {/* <!-- divider-- > */}
        <div className="flex items-center space-x-2">
          <div className="bg-gray-200 w-full h-0.5"></div>
          <div className="text-sm text-gray-400">หรือ</div>
          <div className="bg-gray-200 w-full h-0.5"></div>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div className="text-center">มีบัญชีอยู่แล้วใช่ไหม?</div>
          <div onClick={() => navigate('/')} className="text-orange-400 underline underline-offset-1">
            เข้าสู่ระบบ
          </div>
        </div >
      </div >
    </div >
  );
}
