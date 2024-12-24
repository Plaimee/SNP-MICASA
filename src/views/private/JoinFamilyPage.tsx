import { IFormJoinFamily } from "@/@types/family/IFamily";
import TextField from "@/components/text-field/TextField";
import { ChangeEvent, useState } from "react";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "Yup";

export default function JoinFamilyPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const validate = Yup.object({
    famCode: Yup.string().required("กรุณากรอกรหัสครอบครัว"),
    nickName: Yup.string().required("กรุณากรอกชื่อเล่นของคุณ"),
  });

  async function submitForm(values: IFormJoinFamily) {
    setLoading(true);
    console.log(values);
    setLoading(false);
    navigate("/family");
  }

  return (
    <div className="pad-main">
      <div className="flex items-center w-full space-x-3">
        <Link to="/family">
          <i className="fa-solid fa-arrow-left text-h2"></i>
        </Link>
        <span className="text-body2 font-semibold">เข้าร่วมกลุ่มครอบครัว</span>
      </div>

      <Formik
        enableReinitialize
        validationSchema={validate}
        initialValues={{
          famCode: "",
          nickName: "",
        }}
        onSubmit={(values: IFormJoinFamily) => submitForm(values)}
      >
        {({ setFieldValue, values, touched, errors }) => (
          <Form className="pt-3 space-y-3">
            <TextField
              label="รหัสครอบครัว"
              id="famCode"
              name="famCode"
              value={values.famCode}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFieldValue("famCode", e.target.value)
              }
              touched={touched.famCode}
              error={errors.famCode}
            />

            <TextField
              label="ชื่อเล่นของคุณในครอบครัว"
              id="nickName"
              name="nickName"
              value={values.nickName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFieldValue("nickName", e.target.value)
              }
              touched={touched.nickName}
              error={errors.nickName}
            />

            <button
              disabled={loading}
              type="submit"
              className="btn-bfl btn-main"
            >
              {loading ? (
                <i className="fa-solid fa-spinner animate-spin"></i>
              ) : (
                "เข้าร่วมกลุ่มครอบครัว"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
