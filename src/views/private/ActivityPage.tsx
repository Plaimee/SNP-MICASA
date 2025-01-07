import { IDataMenuCard, MenuDetailCard } from "@/components/menu-card/MenuCard";
import Dropdown from "@/components/dropdown/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { IOptionDDL } from "@/@types/global";
import * as Yup from "Yup";
import { IFormActivityDuty } from "@/@types/family/IFamily";

export default function ActivityPage() {
  const navigate = useNavigate();
  const menus = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "โจ๊ก สูตรเร่งรัด",
      menuType: "เมนูอาหารเช้า",
      description:
        "อาหารเช้าชนิด ข้าวต้มบดละเอียด นิยมใช้ข้าวสวยต้มกับน้ำซุปจนเนียน สามารถใส่เนื้อสัตว์ เช่น  หมูสับ  ตับ  หรือไข่ลวก  และปรุงรสด้วยซีอิ๊ว เกลือ โรยขิงและต้นหอมเหมาะสำหรับมื้อเช้าเพราะย่อยง่ายและอิ่มท้อง",
      ingredient: [
        "ข้าวสวย 1 ถ้วย",
        "น้ำซุป (หมู/ไก่) 2-3 ถ้วย",
        "หมูสับ 100 กรัม",
        "ขิงซอย, ต้นหอมซอย, และไข่ลวก",
        "ซีอิ๊วขาวหรือเกลือ",
      ],
      htCook: [
        "ต้มข้าวสวยในน้ำซุปจนเนื้อเนียนเป็นโจ๊ก",
        "ปั้นหมูสับเป็นก้อน ใส่ลงไปต้มจนสุก",
        "ปรุงรสด้วยซีอิ๊วขาวหรือเกลือ",
        "ตักใส่ชาม โรยขิง ต้นหอม ใส่ไข่ลวกตามชอบ",
      ],
      time: "15",
    },
  ];
  const duties = [
    { id: "1", name: "เตรียมวัตถุดิบ" },
    { id: "2", name: "ปรุงอาหาร" },
    { id: "3", name: "ตกแต่งหน้าตาอาหาร" },
  ];

  function validate() {
    return Yup.object({
      famDuty: Yup.string().required("กรุณาเลือกหน้าที่"),
    });
  }

  async function submitForm(values: IFormActivityDuty) {
    const data: IFormActivityDuty = {
      famDuty: values.famDuty,
    };
    console.log(data);
    navigate("/home");
  }

  return (
    <div className="pad-main space-y-2 mb-3">
      <Link
        to="/family"
        className="flex w-fit items-center space-x-3 previous-page"
      >
        <i className="fa-solid fa-arrow-left text-h2"></i>
        <div className="text-body2 font-semibold">ย้อนกลับ</div>
      </Link>

      <div className="flex w-full text-center justify-center text-h2 font-semibold">
        รายละอียด
      </div>
      <div className="wrap-items-center space-y-2">
        {menus.map((menu: IDataMenuCard, index: number) => (
          <div key={index} className="w-full">
            <MenuDetailCard data={menu} />
          </div>
        ))}
      </div>
      <Formik
        enableReinitialize
        validationSchema={validate}
        initialValues={{ famDuty: "" }}
        onSubmit={(values: IFormActivityDuty) => {
          submitForm(values);
        }}
      >
        {({ setFieldValue, values, touched, errors }) => (
          <Form>
            <div className="w-full mb-3">
              <Dropdown
                title="เลือกหน้าที่ของคุณ"
                options={duties}
                value={duties.filter((g) => g.id === values.famDuty)}
                optionValue="id"
                optionLabel={(z: IOptionDDL) => z?.name}
                onChange={(e: IOptionDDL) => setFieldValue("famDuty", e.id)}
                touched={touched.famDuty}
                error={errors.famDuty}
              />
            </div>
            <button
              type="submit"
              className="btn-bfl btn-main cursor-not-allowed"
            >
              เริ่มการทำอาหาร
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
