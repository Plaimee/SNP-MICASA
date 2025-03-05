import { IOptionDDL } from "@/@types/global";
import { ICreateMenu, IMenuData } from "@/@types/menu/IMenu";
import Dropdown from "@/components/dropdown/Dropdown";
import TextField from "@/components/text-field/TextField";
import UploadFile from "@/components/upload-file/UploadFile";
import { Form, Formik } from "formik";
import * as Yup from "Yup";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { menu_category } from "@/jsondata/global.json";
import { CreateMenu, ReadMenu } from "@/services/menu/Menu.Services";
import AlertMessage from "@/components/notification/AlertMessage";
import MenuCard from "@/components/menu-card/MenuCard";

export default function MenuPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menu, setMenu] = useState<IMenuData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    readMenu();
  }, []);

  const filteredMenu = menu.filter((item) =>
    item.menu_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  async function readMenu() {
    setLoading(true);
    const res = await ReadMenu();
    setLoading(false);
    if (res && res.statusCode === 200 && res.taskStatus) {
      setMenu(res.data);
    }
  }
  const validate = Yup.object().shape({
    menu_title: Yup.string().required("กรุณากรอกชื่ออาหาร"),
    menu_category: Yup.string().required("กรุณาเลือกประเภท"),
    menu_image: Yup.object().shape({
      file: Yup.mixed<File>()
        .required("กรุณาอัปโหลดรูปภาพ")
        .test("fileSize", "ขนาดไฟล์ต้องไม่เกิน 10MB", (value) => {
          if (!value) return false;
          return value instanceof File && value.size <= 10 * 1024 * 1024;
        })
        .test("fileType", "รองรับเฉพาะไฟล์ JPG, JPEG, PNG", (value) => {
          if (!value) return false;
          const acceptedTypes = ["image/jpeg", "image/png", "image/jpg"];
          return value instanceof File && acceptedTypes.includes(value.type);
        }),
    }),
  });

  function createFormData(values: ICreateMenu) {
    const form = new FormData();

    form.append("menu_title", values.menu_title);
    form.append("menu_category", values.menu_category);
    if (values.menu_image.file instanceof File) {
      form.append(
        "menu_image",
        values.menu_image.file,
        values.menu_image.filename || "menu_image.jpg"
      );
    } else if (
      typeof values.menu_image.file === "string" &&
      values.menu_image.file.trim()
    ) {
      form.append("menu_image", values.menu_image.file);
    }

    return form;
  }

  async function submitForm(values: ICreateMenu) {
    const data = createFormData(values);
    setLoading(true);
    const res = await CreateMenu(data);
    setLoading(false);
    if (res && res.statusCode === 201 && res.taskStatus) {
      AlertMessage({
        type: "success",
        title: res.message,
      });
    }
  }

  return (
    <div className="flex flex-wrap pad-main gap-y-3">
      <Link
        to="/family"
        className="flex w-full items-center space-x-3 previous-page"
      >
        <i className="fa-solid fa-arrow-left text-h2"></i>
        <div className="text-body2 font-semibold">ย้อนกลับ</div>
      </Link>
      <div className="flex w-full border border-org-main rounded-md">
        <input
          type="text"
          placeholder="ค้นหาเมนู"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-md focus:outline-none p-1 ps-3 text-small"
        />
        <button className="btn-bft btn-main">
          <i className="fa-solid fa-magnifying-glass text-small text-white"></i>
        </button>
      </div>

      <div className="flex flex-wrap w-full justify-between gap-y-10">
        {filteredMenu.map((values: IMenuData, index: number) => (
          <div key={index} className="w-40">
            <MenuCard data={values} />
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-org-main text-white p-4 rounded-full shadow-lg"
      >
        <i className="fa-solid fa-plus text-h2"></i>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-3">สร้างเมนูใหม่</h2>
            <Formik
              enableReinitialize
              validationSchema={validate}
              initialValues={{
                menu_title: "",
                menu_image: {
                  file: "",
                  filename: "",
                },
                menu_category: "",
              }}
              onSubmit={(values: ICreateMenu) => submitForm(values)}
            >
              {({ setFieldValue, values, touched, errors }) => (
                <Form className="space-y-3">
                  <div className="w-full">
                    <UploadFile
                      accept=".jpg, .png, .jpeg"
                      clearImage={!values.menu_image}
                      onFileChange={(file: File | null) => {
                        if (file) {
                          setFieldValue("menu_image.file", file);
                          setFieldValue("menu_image.filename", file.name);
                        }
                      }}
                      variant="square"
                    />
                    <p className="text-red-main">
                      {errors.menu_image?.file ? errors.menu_image.file : ""}
                    </p>
                  </div>
                  <div className="w-full">
                    <TextField
                      label="ชื่อเมนู"
                      name="menu_title"
                      id="menu_title"
                      placeHolder="ชื่อเมนู..."
                      value={values.menu_title}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFieldValue("menu_title", e.target.value)
                      }
                      touched={touched.menu_title}
                      error={errors.menu_title}
                    ></TextField>
                  </div>
                  <div className="w-full">
                    <Dropdown
                      title="ประเภทอาหาร"
                      options={menu_category}
                      value={menu_category.filter(
                        (g) => g.id === values.menu_category
                      )}
                      optionValue="id"
                      optionLabel={(z: IOptionDDL) => z?.name}
                      onChange={(e: IOptionDDL) =>
                        setFieldValue("menu_category", e.id)
                      }
                      touched={touched.menu_category}
                      error={errors.menu_category}
                    />
                  </div>
                  <div className="flex justify-end space-x-2 mt-3">
                    <button
                      className="btn-bft btn-sub"
                      onClick={() => setIsModalOpen(false)}
                    >
                      ยกเลิก
                    </button>
                    <button
                      disabled={loading}
                      type="submit"
                      className="btn-bft btn-main"
                    >
                      {loading ? (
                        <i className="fa-solid fa-spinner animate-spin"></i>
                      ) : (
                        "สร้าง"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}
