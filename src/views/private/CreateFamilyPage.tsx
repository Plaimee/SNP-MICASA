import { IFormFamily } from "@/@types/family/IFamily";
import AlertMessage from "@/components/notification/AlertMessage";
import TextField from "@/components/text-field/TextField";
import UploadFile from "@/components/upload-file/UploadFile";
import { CreateFamily } from "@/services/family/Family.Services";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { addFamCode, userData } from "@/stores/reducers/authenReducer";
import { Form, Formik } from "formik";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "Yup";

export default function CreateFamilyPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userData);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  function validate() {
    return Yup.object({
      famName: Yup.string().required("กรุณากรอกชื่อครอบครัว"),
      nickName: Yup.string().required("กรุณาชื่อเล่นของคุณ"),
    });
  }

  function createFormData(values: IFormFamily) {
    const form = new FormData();

    form.append("usrId", values.usrId.toString());
    form.append("famName", values.famName);
    form.append("nickName", values.nickName);
    form.append("roleId", values.roleId.toString());
    form.append("usrImg", values.usrProfile);
    if (values.famProfile.file instanceof File) {
      form.append(
        "famImg",
        values.famProfile.file,
        values.famProfile.filename || "profile.jpg"
      );
    } else if (
      typeof values.famProfile.file === "string" &&
      values.famProfile.file.trim()
    ) {
      form.append("famImg", values.famProfile.file);
    }

    return form;
  }

  async function submitForm(values: IFormFamily) {
    const data = createFormData(values);
    setLoading(true);
    const res = await CreateFamily(data);
    console.log(values);
    setLoading(false);
    if (res && res.statusCode === 201 && res.taskStatus) {
      AlertMessage({
        type: "success",
        title: res.message,
      });
      dispatch(addFamCode({ famCode: res.data.famCode }));
      navigate("/family", { state: { famCode: res.data.famCode } });
    }
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
            usrId: user?.id ?? 0,
            famName: "",
            famProfile: {
              file: "",
              filename: "",
            },
            nickName: "",
            roleId: user?.roleId ?? 0,
            usrProfile: user?.profile ?? "",
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
