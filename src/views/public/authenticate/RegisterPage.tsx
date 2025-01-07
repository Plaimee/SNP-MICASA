import { IFormCreateAccount } from "@/@types/authentication/IRegister";
import { IStateLocationRegister } from "@/@types/authentication/IStateLocation";
import TextField from "@/components/text-field/TextField";
import { Form, Formik } from "formik";
import { ChangeEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "Yup";

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { account }: IStateLocationRegister = location.state || {};

  const validate = Yup.object({
    email: Yup.string().email().required("กรุณากรอกอีเมล์"),
    password: Yup.string().required("กรุณากรอกรหัสผ่าน"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), undefined], "รหัสผ่านไม่ตรงกัน").required("กรุณายืนยันรหัสผ่าน")
  });

  return (
    <div className="wrap-items-center">
      <div className="container-title pad-main items-center">
        <h3>สร้างบัญชี Micasa</h3>
        <p>ลงทะเบียนสมัครสมาชิก</p>
      </div>
      <Formik
        enableReinitialize
        validationSchema={validate}
        initialValues={{
          email: account ? account.email : "",
          password: account ? account.password : "",
          confirmPassword: account ? account.confirmPassword : ""
        }}
        onSubmit={(values: IFormCreateAccount) => navigate('/register/more-detail', { state: { account: values } })}
      >
        {({ setFieldValue, values, touched, errors }) =>
          <Form className="flex justify-center">
            <div className="wrap-items-center w-full md:w-6/12">
              <div className="w-full pad-main">
                <TextField
                  type="email"
                  label="อีเมล"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue("email", e.target.value)}
                  touched={touched.email}
                  error={errors.email}
                />
              </div>
              <div className="w-full pad-main">
                <TextField
                  type="password"
                  label="รหัสผ่าน"
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue("password", e.target.value)}
                  touched={touched.password}
                  error={errors.password}
                />
              </div>
              <div className="w-full pad-main">
                <TextField
                  type="password"
                  label="ยืนยันรหัสผ่าน"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue("confirmPassword", e.target.value)}
                  touched={touched.confirmPassword}
                  error={errors.confirmPassword}
                />
              </div>
              <div className="container-button mt-3">
                <button type="submit" className="btn-bfl btn-main">ถัดไป</button>
              </div>
              <div className="flex w-full pad-main items-center">
                <span className="w-full h-1 border-b border-gray opacity-50"></span>
                <span className="px-2">หรือ</span>
                <span className="w-full h-1 border-b border-gray opacity-50"></span>
              </div>

              <p className="pad-main">มีบัญชีอยู่แล้วใช่ไหม? <Link to='/login' className="text-org-main underline pl-2">เข้าสู่ระบบ</Link></p>
            </div>
          </Form>
        }
      </Formik>
    </div>
  );
}
