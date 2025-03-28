import {
  IFormCreateAccount,
  IFormRegister,
} from "@/@types/authentication/IRegister";
import { IStateLocationRegister } from "@/@types/IStateLocation";
import { IOptionDDL } from "@/@types/global";
import Dropdown from "@/components/dropdown/Dropdown";
import TextField from "@/components/text-field/TextField";
import UploadFile from "@/components/upload-file/UploadFile";
import { Form, Formik } from "formik";
import { ChangeEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "Yup";
import { genders, familyRole } from "@/jsondata/global.json";
import { Registration } from "@/services/authenticate/Authenticate.Services";
import AlertMessage from "@/components/notification/AlertMessage";
import { ReadFamily } from "@/services/family/Family.Services";
import { IFamilyData } from "@/@types/family/IFamily";
import LeaderCard from "@/components/leader-card/LeaderCard";

export default function MoreRegisterDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { account }: IStateLocationRegister = location.state || {};
  const [famData, setFamData] = useState<IFamilyData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function readFamily(famCode: string) {
    setLoading(true);
    const res = await ReadFamily(famCode);
    setLoading(false);
    if (res && res.statusCode === 200 && res.taskStatus) {
      setFamData(res.data);
    }
  }
  console.log(famData);

  const validate = Yup.object({
    fname: Yup.string().required("กรุณากรอกชื่อ"),
    lname: Yup.string().required("กรุณากรอกนามสกุล"),
    gender: Yup.string().required("กรุณาเลือกเพศ"),
    familyRole: Yup.string().required("กรุณาเลือกบทบาท"),
    profile: Yup.object().shape({
      file: Yup.mixed<File | string>()
        .test(
          "fileValidation",
          "กรุณาอัปโหลดรูปโปรไฟล์",
          (
            value: string | File | undefined,
            context: Yup.TestContext<Yup.AnyObject>
          ) => {
            if (
              context.parent.filename ||
              (typeof value === "string" && value.trim() !== "")
            ) {
              return true;
            }

            if (value instanceof File) {
              return value.size > 0;
            }

            return false;
          }
        )
        .test("fileSize", "ขนาดไฟล์ต้องไม่เกิน 10MB", (value) => {
          if (typeof value === "string" || !value) return true;

          if (!(value instanceof File)) return false;
          return value.size <= 10 * 1024 * 1024; // 10MB
        })
        .test("fileType", "รองรับเฉพาะไฟล์ JPG, JPEG, PNG", (value) => {
          if (typeof value === "string" || !value) return true;

          if (!(value instanceof File)) return false;
          const acceptedTypes = ["image/jpeg", "image/png", "image/jpg"];
          return acceptedTypes.includes(value.type);
        }),
    }),
  });

  function createFormData(values: IFormRegister, account: IFormCreateAccount) {
    const form = new FormData();

    form.append("fName", values.fname);
    form.append("lName", values.lname);
    form.append("email", account.email);
    form.append("password", account.password);
    form.append("roleId", values.familyRole);
    form.append("gender", values.gender);
    if (values.profile.file instanceof File) {
      form.append(
        "usrImg",
        values.profile.file,
        values.profile.filename || "profile.jpg"
      );
    } else if (
      typeof values.profile.file === "string" &&
      values.profile.file.trim()
    ) {
      form.append("usrImg", values.profile.file);
    }

    return form;
  }

  async function submitForm(values: IFormRegister) {
    const data = createFormData(values, account);
    setLoading(true);
    const res = await Registration(data);
    setLoading(false);
    if (res && res.statusCode === 201 && res.taskStatus) {
      AlertMessage({
        type: "success",
        title: res.message,
      });
      navigate("/login", { state: { ...res.data, famCode: values.famCode } });
    } else {
      AlertMessage({
        type: "warning",
        title: "ลงทะเบียนไม่สำเร็จ",
        text: res.message,
      });
    }
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
            filename: "",
          },
          fname: "",
          lname: "",
          gender: "",
          familyRole: "",
          famCode: "",
        }}
        onSubmit={(values: IFormRegister) => submitForm(values)}
      >
        {({ setFieldValue, values, touched, errors }) => (
          <Form className="flex justify-center">
            <div className="wrap-items-center space-y-1 md:w-6/12">
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
                  variant="circle"
                />
                <p className="text-red-main">
                  {errors.profile?.file ? errors.profile.file : ""}
                </p>
              </div>
              <div className="w-full pad-main">
                <TextField
                  label="ชื่อ"
                  name="fname"
                  id="fname"
                  value={values.fname}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue("fname", e.target.value)
                  }
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue("lname", e.target.value)
                  }
                  touched={touched.lname}
                  error={errors.lname}
                />
              </div>
              <div className="w-full pad-main">
                <Dropdown
                  title="เพศ"
                  options={genders}
                  value={genders.filter((g) => g.id === values.gender)}
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
                  value={familyRole.filter((g) => g.id === values.familyRole)}
                  optionValue="id"
                  optionLabel={(z: IOptionDDL) => z?.name}
                  onChange={(e: IOptionDDL) =>
                    setFieldValue("familyRole", e.id)
                  }
                  touched={touched.familyRole}
                  error={errors.familyRole}
                />
              </div>
              <div className="flex w-full pad-main items-center">
                <span className="w-full h-1 border-b border-gray opacity-50"></span>
                <span className="w-full text-center px-1">
                  มีครอบครัวแล้วหรือยัง
                </span>
                <span className="w-full h-1 border-b border-gray opacity-50"></span>
              </div>
              <div className="w-full pad-main">
                <TextField
                  label="รหัสครอบครัว"
                  name="famCode"
                  id="famCode"
                  value={values.famCode}
                  onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("famCode", e.target.value);
                    await readFamily(e.target.value);
                    if (e.target.value === "") {
                      setFamData(null);
                    }
                  }}
                />
              </div>
              <div className="w-full pad-main">
                {famData !== null ? (
                  <LeaderCard
                    data={{
                      id: famData.id,
                      img: famData.profile,
                      famName: famData.famName,
                      rank: 0,
                      activity: 0,
                    }}
                  />
                ) : (
                  "ไม่พบข้อมูลครอบครัว"
                )}
              </div>
              <div className="container-button pad-main">
                <button
                  disabled={loading}
                  type="submit"
                  className="btn-bfl btn-main"
                >
                  {loading ? (
                    <i className="fa-solid fa-spinner animate-spin"></i>
                  ) : (
                    "ยืนยัน"
                  )}
                </button>
                <button
                  type="reset"
                  className="btn-bfl btn-sub"
                  onClick={() => navigate("/register", { state: { account } })}
                >
                  ย้อนกลับ
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
