import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { ChangeEvent, useState } from "react";
import * as Yup from "Yup";

export interface IFormInitial {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  async function submitForm(values: IFormInitial) {
    setLoading(true);
    console.log(values); // call api
    // const res = await Authenticate(values)
    // if (res && res.statusCode === 200 && res.taskStatus) {
    //   navigate('/home')
    // } else {
    //   // alert
    // }
    setLoading(false);
  }

  return (
    <div className="flex flex-col bg-orange-400 w-full h-screen">
      <div className="w-full h-1/4"></div>
      <div className="w-full h-3/4 bg-white rounded-2xl p-5 space-y-5">
        <div className="space-y-2">
          <div className="text-2xl font-b">เข้าสู่ระบบ</div>
          <div className="text-base">ยินดีต้อนรับกลับ! กรุณาเข้าสู่ระบบเพื่อเริ่มใช้งาน</div>
        </div>
        <Formik
          enableReinitialize
          validationSchema={Yup.object({
            email: Yup.string().required("กรุณากรอกอีเมล์"),
            password: Yup.string().required("กรุณากรอกรหัสผ่าน")
          })}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values: IFormInitial) => submitForm(values)}
        >
          {({ setFieldValue, values }) =>
            <Form className="space-y-5">
              <div className="space-y-0">
                <label className="block text-gray-700 text-base font-bold mb-2"> Email </label>
                <input
                  className="shadow appearance-none border rounded w-full p-3 border-orange-400 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="กรอกอีเมล"
                  value={values.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-center">
                  <label className="block text-gray-700 text-base font-bold">Password </label>
                  <a
                    className="inline-block align-baseline text-sm text-gray-700 underline underline-offset-2 hover:font-bold"
                    href="#"
                  >
                    ลืมรหัสผ่าน?
                  </a>
                </div>

                <input
                  className="shadow appearance-none border border-orange-400 rounded w-full p-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="กรอกรหัสผ่าน"
                  value={values.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue("password", e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <button
                  disabled={loading}
                  type="submit"
                  className="bg-orange-400 hover:bg-orange-700 text-white font-bold p-3 rounded-md focus:outline-none focus:shadow-outline w-full"
                >
                  {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : "เข้าสู่ระบบ"}
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <div className="bg-gray-200 w-full h-0.5"></div>
                <div className="text-sm text-gray-400">หรือ</div>
                <div className="bg-gray-200 w-full h-0.5"></div>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="text-center">ยังไม่มีบัญชีใช่ไหม?</div>
                <div onClick={() => navigate('/register')} className="text-orange-400 underline underline-offset-1">
                  สมัครสมาชิก
                </div>
              </div>
            </Form>
          }
        </Formik>

      </div>
    </div >
  );
}
