import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { ChangeEvent, useState } from "react";
import * as Yup from "Yup";
import Logo from "@/assets/Logo.png"
import TextField from "@/components/text-field/TextField";

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
    
    // } else {
    //   // alert
    // }
    setLoading(false);
    navigate('/home')
  }

  function validate() {
    return Yup.object({
      email: Yup.string().email().required('email'),
      password: Yup.string().required('password')
    })
  }

  return (
    <div className="wrap-items-center">
      <div className="flex justify-center items-center w-full h-[150px]">
        <img src={Logo} alt="" className="w-full h-[120px] object-contain" />
      </div>
      <div className="w-full">
      <Formik
      enableReinitialize
      validationSchema={validate}
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values:IFormInitial) => submitForm(values)}
      >
        {({ setFieldValue, values, touched, errors }) => 
        <Form>
          <div className="wrap-items-center">
            <div className="w-full md:w-6/12 pad-main">
              <TextField
              label="อีเมล"
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue("email", e.target.value)}
              touched={touched.email}
              error={errors.email}
              />
            </div>
            <div className="w-full md:w-6/12 pad-main">
              <TextField
              label="รหัสผ่าน"
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue("password", e.target.value)}
              touched={touched.password}
              error={errors.password}
              />
            </div>
            <div className="container-button">
              <button
                disabled={loading}
                type="submit"
                className="btn-bfl btn-main"
                >
                {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : "เข้าสู่ระบบ"}
              </button>
            </div>
            {/* <div className="flex py-5 items-center">
                <div className="border-t w-full border-gray"></div>
                <span className="mx-4 text-gray">Content</span>
                <div className="border-t w-full border-gray"></div>
            </div> */}
            <div className="flex w-full pad-main items-center">
              <span className="w-full h-1 border-b border-gray opacity-50"></span>
              <span className="px-2">หรือ</span>
              <span className="w-full h-1 border-b border-gray opacity-50"></span>
            </div>

            <p className="pad-main">ยังไม่มีบัญชีใช่หรือไม่? <Link to='/register' className="text-org-main underline pl-2">สมัครสมาชิก</Link></p>
          </div>
        </Form>
        }
      </Formik>
      </div>
    </div>
  );
}
