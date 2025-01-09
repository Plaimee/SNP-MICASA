import { IFormFamily } from "@/@types/family/IFamily";
import TextField from "@/components/text-field/TextField";
import UploadFile from "@/components/upload-file/UploadFile";
import { useAppSelector } from "@/stores/hooks";
import { userData } from "@/stores/reducers/authenReducer";
import { Form, Formik } from "formik";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "Yup";

export default function CreateFamilyPage() {
  const user = useAppSelector(userData);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  function validate() {
    return Yup.object({
      famName: Yup.string().required("กรุณากรอกชื่อครอบครัว"),
      nickName: Yup.string().required("กรุณาชื่อเล่นของคุณ"),
      // famImg: Yup.object().shape({
      //   file: Yup.mixed<File | string>()
      //     .test(
      //       "fileValidation",
      //       "กรุณาอัปโหลดรูปโปรไฟล์",
      //       (value, context) => {
      //         if (
      //           context.parent.filename ||
      //           (typeof value === "string" && value.trim() !== "")
      //         ) {
      //           return true;
      //         }

      //         if (value instanceof File) {
      //           return value.size > 0;
      //         }

      //         return false;
      //       }
      //     )
      //     .test("fileSize", "ขนาดไฟล์ต้องไม่เกิน 10MB", (value) => {
      //       if (typeof value === "string" || !value) return true;

      //       if (!(value instanceof File)) return false;
      //       return value.size <= 10 * 1024 * 1024; // 10MB
      //     })
      //     .test("fileType", "รองรับเฉพาะไฟล์ JPG, JPEG, PNG", (value) => {
      //       if (typeof value === "string" || !value) return true;

      //       if (!(value instanceof File)) return false;
      //       const acceptedTypes = ["image/jpeg", "image/png", "image/jpg"];
      //       return acceptedTypes.includes(value.type);
      //     }),
      // }),
    });
  }

  async function submitForm(values: IFormFamily) {
    setLoading(true);
    console.log(values);
    setLoading(false);
    navigate("/family");
  }

  return (
    <div className="flex flex-col w-full pad-main space-y-3">
      <div className="flex items-center w-full space-x-3">
        <Link to="/family">
          <i className="fa-solid fa-arrow-left text-h2"></i>
        </Link>
        <span className="text-body2 font-semibold">สร้างครอบครัวครอบครัว</span>
      </div>

      <div className="flex flex-col w-full space-y-2">
        <div className="text-body3 font-semibold">รูปโปรไฟล์ครอบครัว</div>

        <Formik
          enableReinitialize
          validationSchema={validate}
          initialValues={{
            // famImg: {
            //   file: "",
            //   filename: "",
            // },
            // famName: "",
            // nickName: "",
            // famRole: 0,
            userid: user?.id ?? 0,
            famName: "",
            famProfile: {
              file: "",
              filename: ""
            },
            roleId: user?.roleId ?? 0,
            nickName: "",
            profile: user?.profile ?? "",
          }}
          onSubmit={(values: IFormFamily) => submitForm(values)}
        >
          {({ setFieldValue, values, touched, errors }) => (
            <Form className="space-y-2">
              <div className="w-full">
                <UploadFile
                  accept=".jpg, .png, .jpeg"
                  clearImage={!values.famProfile}
                  onFileChange={(file: File | null) => {
                    if (file) {
                      setFieldValue("famProfile.file", file);
                      setFieldValue("famProfile.filename", file.name);
                    }
                  }}
                />
                <p className="text-red-main text-center pt-3">
                  {errors.famProfile?.file ? errors.famProfile.file : ""}
                </p>
              </div>

              <div className="w-full">
                <TextField
                  label="ชื่อครอบครัว"
                  name="famName"
                  id="famName"
                  value={values.famName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue("famName", e.target.value)
                  }
                  touched={touched.famName}
                  error={errors.famName}
                />
              </div>

              <div className="w-full">
                <TextField
                  label="ชื่อเล่นของคุณในครอบครัว"
                  name="nickName"
                  id="nickName"
                  value={values.nickName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue("nickName", e.target.value)
                  }
                  touched={touched.nickName}
                  error={errors.nickName}
                />
              </div>

              <button
                disabled={loading}
                type="submit"
                className="btn-bfl btn-main"
              >
                {loading ? (
                  <i className="fa-solid fa-spinner animate-spin"></i>
                ) : (
                  "สร้างครอบครัว"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
