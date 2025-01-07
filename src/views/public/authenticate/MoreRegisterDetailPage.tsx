import { IFormDataRegister, IFormRegister } from "@/@types/authentication/IRegister";
import { IStateLocationRegister } from "@/@types/authentication/IStateLocation";
import { IOptionDDL } from "@/@types/global";
import Dropdown from "@/components/dropdown/Dropdown";
import TextField from "@/components/text-field/TextField";
import UploadFile from "@/components/upload-file/UploadFile";
import { Form, Formik } from "formik";
import { ChangeEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "Yup";
import { genders, familyRole } from "@/jsondata/global.json";

export default function MoreRegisterDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { account }: IStateLocationRegister = location.state || {};
  const [loading, setLoading] = useState<boolean>(false);

  const validate = Yup.object({
    fname: Yup.string().required("กรุณากรอกชื่อ"),
    lname: Yup.string().required("กรุณากรอกนามสกุล"),
    gender: Yup.string().required("กรุณาเลือกเพศ"),
    familyRole: Yup.string().required("กรุณาเลือกบทบาท"),
    profile: Yup.object().shape({
      file: Yup.mixed<File | string>()
        .test("fileValidation", "กรุณาอัปโหลดรูปโปรไฟล์", (value, context) => {
          // If there's an existing filename or URL, consider it valid
          if (context.parent.filename ||
            (typeof value === 'string' && value.trim() !== '')) {
            return true;
          }

          // For new file uploads
          if (value instanceof File) {
            return value.size > 0;
          }

          // If no file and no filename, it's invalid
          return false;
        })
        .test("fileSize", "ขนาดไฟล์ต้องไม่เกิน 10MB", (value) => {
          // Skip size check if it's an existing image URL or filename
          if (typeof value === 'string' || !value) return true;

          if (!(value instanceof File)) return false;
          return value.size <= 10 * 1024 * 1024; // 10MB
        })
        .test("fileType", "รองรับเฉพาะไฟล์ JPG, JPEG, PNG", (value) => {
          // Skip type check if it's an existing image URL or filename
          if (typeof value === 'string' || !value) return true;

          if (!(value instanceof File)) return false;
          const acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
          return acceptedTypes.includes(value.type);
        })
    })
  });

  async function submitForm(values: IFormRegister) {
    const data: IFormDataRegister = {
      profile: values.profile.file,
      profileFilename: values.profile.filename,
      email: account.email,
      password: account.password,
      fname: values.fname,
      lname: values.lname,
      gender: values.gender,
      familyRole: values.familyRole,
    };

    setLoading(true);
    console.log(data);
    setLoading(false);
    navigate('/login');
  }

  return (
    <div className="wrap-items-center">
      <div className="container-title items-center">
        <h3>ข้อมูลพื้นฐาน</h3>
        <p>รายละเอียดเกี่ยวกับคุณ</p>
      </div>
      <Formik
        enableReinitialize
        validationSchema={validate}
        initialValues={{
          profile: {
            file: "",
            filename: ""
          },
          fname: "",
          lname: "",
          gender: "",
          familyRole: ""
        }}
        onSubmit={(values: IFormRegister) => submitForm(values)}
      >
        {({ setFieldValue, values, touched, errors }) =>
          <Form className="flex justify-center">
            <div className="wrap-items-center md:w-6/12">
              <div className="w-full pad-main">
                <UploadFile
                  accept=".jpg, .png, .jpeg"
                  clearImage={!values.profile}
                  onFileChange={(file: File | null) => {
                    if (file) {
                      setFieldValue("profile.file", file);
                      setFieldValue("profile.filename", file.name);
                    }
                  }}
                />
                <p className="text-red-main">{errors.profile?.file ? errors.profile.file : ""}</p>
              </div>
              <div className="w-full pad-main">
                <TextField
                  label="ชื่อ"
                  name="fname"
                  id="fname"
                  value={values.fname}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue("fname", e.target.value)}
                  touched={touched.fname}
                  error={errors.fname}
                />
              </div>
              <div className="w-full pad-main">
                <TextField
                  label="นามสกุล"
                  name="lname"
                  id="lname"
                  value={values.lname}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue("lname", e.target.value)}
                  touched={touched.lname}
                  error={errors.lname}
                />
              </div>
              <div className="w-full pad-main">
                <Dropdown
                  title="เพศ"
                  options={genders}
                  value={genders.filter(g => g.id === values.gender)}
                  optionValue="id"
                  optionLabel={(z: IOptionDDL) => z?.name}
                  onChange={(e: IOptionDDL) => setFieldValue("gender", e.id)}
                  touched={touched.gender}
                  error={errors.gender}
                />
              </div>
              <div className="w-full pad-main">
                <Dropdown
                  title="บทบาทในครอบครัว"
                  options={familyRole}
                  value={familyRole.filter(g => g.id === values.familyRole)}
                  optionValue="id"
                  optionLabel={(z: IOptionDDL) => z?.name}
                  onChange={(e: IOptionDDL) => setFieldValue("familyRole", e.id)}
                  touched={touched.familyRole}
                  error={errors.familyRole}
                />
              </div>
              <div className="container-button pad-main mt-3">
                <button disabled={loading} type="submit" className="btn-bfl btn-main" >
                  {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : "ยืนยัน"}
                </button>
                <button type="reset" className="btn-bfl btn-sub" onClick={() => navigate('/register', { state: { account } })}>
                  ย้อนกลับ
                </button>
              </div>
            </div>
          </Form>
        }
      </Formik>
    </div>
  );
}
