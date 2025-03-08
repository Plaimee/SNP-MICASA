import { IMenuData } from "@/@types/menu/IMenu";
import { useEffect, useState } from "react";
import { menu_category, purchase_type } from "@/jsondata/global.json";
import { Form, Formik } from "formik";
import Dropdown from "../dropdown/Dropdown";
import { IOptionDDL } from "@/@types/global";
import * as Yup from "Yup";
import { ICreateActivity } from "@/@types/activity/IActivity";
import { useAppSelector } from "@/stores/hooks";
import { userData } from "@/stores/reducers/authenReducer";
import { IFamilyData, IFamilyMember } from "@/@types/family/IFamily";
import { CreateActivity } from "@/services/activity/Activity.Services";
import AlertMessage from "../notification/AlertMessage";

export interface MenuCardProps {
  data: IMenuData;
  fam: IFamilyData | null;
}

export default function MenuCard({ data, fam }: MenuCardProps) {
  const user = useAppSelector(userData);
  const [famMember, setFamMember] = useState<IFamilyMember[]>([]);
  const [showDetail, setShowDetail] = useState<IFamilyData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (fam) {
      setFamMember(fam.famMember);
    }
  }, [fam]);

  const validate = Yup.object().shape({
    purchase_type: Yup.string().required("กรุณาเลือกประเภทกิจกรรม"),
    fam_mem_id: Yup.string().required("กรุณาเลือกผู้ที่จะทำกิจกรรม"),
  });

  function createForm(values: ICreateActivity) {
    const form = new FormData();

    form.append("user_id", values.user_id.toString());
    form.append("fam_id", values.fam_id.toString());
    form.append("fam_mem_id", values.fam_mem_id);
    form.append("fam_mem_nickName", values.fam_mem_nickName);
    form.append("fam_mem_image", values.fam_mem_image);
    form.append("menu_id", values.menu_id.toString());
    form.append("menu_title", values.menu_title);
    form.append("menu_images", values.menu_images);
    form.append("menu_category", values.menu_category);
    form.append("purchase_type", values.purchase_type);
    form.append("status_type", values.status_type);

    return form;
  }

  async function submitForm(values: ICreateActivity, resetForm: () => void) {
    const data = createForm(values);
    setLoading(true);
    const res = await CreateActivity(data);
    setLoading(false);

    if (res && res.statusCode === 201 && res.taskStatus) {
      AlertMessage({
        type: "success",
        title: res.message,
      });

      resetForm();
      setShowDetail(null);
    }
  }

  return (
    <div className="flex flex-col w-full gap-y-2 border border-org-main rounded-md p-2">
      <img
        src={data.menu_image}
        alt={data.menu_title}
        className="rounded-md object-cover w-full h-20"
      />
      <div className="text-small font-bold">{data.menu_title}</div>
      <div className="text-small">
        (
        {
          menu_category.find((c) => String(c.id) === String(data.menu_category))
            ?.name
        }
        )
      </div>
      <button
        className="btn-bfl bg-org-main text-body3 text-white font-medium"
        onClick={() => setShowDetail(fam)}
      >
        ดูรายละเอียด
      </button>

      {showDetail !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-4 rounded-md shadow-lg w-11/12 max-w-md relative">
            <MenuDetailCard data={data} />
            <Formik
              enableReinitialize
              validationSchema={validate}
              initialValues={{
                user_id: user?.id ?? 0,
                menu_id: data.id,
                menu_title: data.menu_title ?? "",
                menu_images: data.menu_image ?? "",
                menu_category: data.menu_category ?? "",
                fam_id: fam?.id ?? 0,
                fam_mem_id: "",
                fam_mem_nickName: "",
                fam_mem_image: "",
                purchase_type: "",
                status_type: "1",
              }}
              onSubmit={(values: ICreateActivity, { resetForm }) =>
                submitForm(values, resetForm)
              }
            >
              {({ setFieldValue, values, touched, errors }) => (
                <Form className="flex flex-wrap gap-y-3">
                  <div className="w-full">
                    <Dropdown
                      title="ประเภทการทำกิจกรรม"
                      options={purchase_type}
                      value={purchase_type.filter(
                        (p) => p.id === values.purchase_type
                      )}
                      optionValue="id"
                      optionLabel={(z: IOptionDDL) => z?.name}
                      onChange={(e: IOptionDDL) =>
                        setFieldValue("purchase_type", e.id)
                      }
                      touched={touched.purchase_type}
                      error={errors.purchase_type}
                    />
                  </div>
                  <div className="w-full">
                    <Dropdown
                      title="เลือกผู้ทำกิจกรรม"
                      options={famMember}
                      value={famMember.filter(
                        (m) => m.id === values.fam_mem_id
                      )}
                      optionValue="id"
                      optionLabel={(z: IFamilyMember) => z?.nickName}
                      onChange={(e: IFamilyMember) => {
                        setFieldValue("fam_mem_id", e.id);
                        setFieldValue("fam_mem_nickName", e.nickName);
                        setFieldValue("fam_mem_image", e.usrImg);
                      }}
                      touched={touched.fam_mem_id}
                      error={errors.fam_mem_id}
                    />
                  </div>

                  <div className="w-full flex gap-x-3">
                    <button
                      className="btn-bfl btn-sub"
                      onClick={() => setShowDetail(null)}
                    >
                      ยกเลิก
                    </button>
                    <button type="submit" className="btn-bfl btn-main">
                      {loading ? (
                        <i className="fa-solid fa-spinner animate-spin"></i>
                      ) : (
                        "ยืนยัน"
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

export function MenuDetailCard({ data }: { data: IMenuData }) {
  // const [showRecipeDetail, setShowRecipeDetail] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-full space-y-2 py-3">
      <img
        src={data.menu_image}
        alt={data.menu_title}
        className="rounded-md object-cover w-full h-56"
      />
      <div className="flex w-full items-center gap-x-3">
        <div className="text-body2 font-bold">{data.menu_title}</div>
        <div className="text-small">
          (
          {
            menu_category.find(
              (c) => String(c.id) === String(data.menu_category)
            )?.name
          }
          )
        </div>
      </div>
    </div>
  );
}

export function PendingMenuCard({ data }: { data: IMenuData }) {
  return (
    <div className="flex items-center justify-between w-full bg-org-main/10 rounded-md p-4 pb-3">
      <div className="flex flex-row items-center space-x-3">
        <img
          className="w-12 h-12 rounded-md"
          src={data.menu_image}
          alt={data.menu_title}
        />
        <div className="text-body3 font-semibold">{data.menu_title}</div>
        <div className="text-small text-gray">
          (
          {
            menu_category.find(
              (c) => String(c.id) === String(data.menu_category)
            )?.name
          }
          )
        </div>
      </div>

      <i className="fa-solid fa-chevron-right text-h2"></i>
    </div>
  );
}
