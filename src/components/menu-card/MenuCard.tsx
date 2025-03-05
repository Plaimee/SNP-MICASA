import { IMenuData } from "@/@types/menu/IMenu";
import { useEffect, useState } from "react";
import { menu_category, purchase_type } from "@/jsondata/global.json";
import { Form, Formik } from "formik";
import Dropdown from "../dropdown/Dropdown";
import { IOptionDDL } from "@/@types/global";
import * as Yup from "Yup";
import { ICreateActivity } from "@/@types/activity/IActivity";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/stores/hooks";
import { userData } from "@/stores/reducers/authenReducer";
import { IFamilyStateLocation } from "@/@types/IStateLocation";
import { IFamilyMember } from "@/@types/family/IFamily";

export interface MenuCardProps {
  data: IMenuData;
  mode?: "default" | "detail";
}

export default function MenuCard({ data }: MenuCardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector(userData);
  const { famData }: IFamilyStateLocation = location.state || {};
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (famData === null) {
      navigate("/family");
    }
  }, [famData, navigate]);

  const validate = Yup.object().shape({
    purchase_type: Yup.string().required("กรุณาเลือกประเภทกิจกรรม"),
    fam_mem_id: Yup.string().required("กรุณาเลือกผู้ที่จะทำกิจกรรม"),
  });

  async function submitForm(values: ICreateActivity) {
    setLoading(true);
    console.log(values);
    setLoading(false);
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
        onClick={() => setShowDetail(true)}
      >
        ดูรายละเอียด
      </button>

      {showDetail && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-4 rounded-md shadow-lg w-11/12 max-w-md relative">
            <MenuDetailCard data={data} />
            <Formik
              enableReinitialize
              validationSchema={validate}
              initialValues={{
                user_id: user?.id ?? 0,
                menu_id: data.id,
                fam_id: famData?.id ?? 0,
                fam_mem_id: "",
                purchase_type: "",
                status_type: "1",
              }}
              onSubmit={(values: ICreateActivity) => submitForm(values)}
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
                    {famData &&
                      famData?.famMember?.length > 0 &&
                      famData?.famMember.map((mem: IFamilyMember) => (
                        <Dropdown
                          key={mem.id}
                          title="เลือกผู้ที่จะทำกิจกรรม"
                          options={famData.famMember}
                          value={
                            famData.famMember.find(
                              (m) => m.id === values.fam_mem_id
                            ) ?? null
                          }
                          optionValue="id"
                          optionLabel={(m: IFamilyMember) =>
                            m?.nickName ?? "Unknown"
                          }
                          onChange={(e: IFamilyMember) =>
                            setFieldValue("fam_mem_id", e.id)
                          }
                          touched={touched.fam_mem_id}
                          error={errors.fam_mem_id}
                        />
                      ))}
                  </div>

                  <div className="w-full flex gap-x-3">
                    <button
                      className="btn-bfl btn-sub"
                      onClick={() => setShowDetail(false)}
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
