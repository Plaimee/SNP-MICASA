import StatusCard, {
  IDataStatusCard,
} from "@/components/status-card/StatusCard";
import MenuCard, { IDataMenuCard } from "@/components/menu-card/MenuCard";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "@/assets/Logo.png";

export default function FamilyPage() {
  const [check, setCheck] = useState<boolean>(false);

  const status = [
    {
      id: "pending",
      title: "กำลังดำเนินการอยู่",
      description: "(เลือกเมนู)",
      amount: 0,
    },
    {
      id: "success",
      title: "รายการที่สำเร็จ",
      description: "(ยังไม่มีเมนู)",
      amount: 0,
    },
    {
      id: "failed",
      title: "รายการไม่สำเร็จ",
      description: "(ยังไม่มีเมนู)",
      amount: 0,
    },
  ];

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
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "โจ๊ก หัวคลอง",
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
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "โจ๊ก กู้ภัย",
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

  return (
    <Fragment>
      {check ? (
        <div className="flex items-center justify-center w-full h-dvh mt-[-60px] pad-main">
          <div className="flex flex-col justify-center items-center w-60 rounded-md shadow-md p-5 text-center space-y-2">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray/10">
              <i className="fa-solid fa-question text-[46px] opacity-50"></i>
            </div>
            <span className="text-body3 font-semibold">ไม่พบกลุ่มครอบครัว</span>
            <p className="text-small text-wrap">
              เราไม่พบกลุ่มครอบครัวของคุณ โปรดสร้างหรือ ค้นหากลุ่มครอบครัวของคุณ
            </p>
            <div className="w-full space-y-3 pt-3">
              <Link
                to="/family/create"
                className="btn-bfl bg-org-main text-white text-body-3"
              >
                สร้างครอบครัว
              </Link>
              <Link
                to="/family/join"
                className="btn-bfl border border-org-main text-org-main text-body-3 font-medium"
              >
                เข้าร่วมกลุ่มครอบครัว
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="flex justify-between items-center py-5 bg-gray/10 w-full pad-main">
            <div className="flex space-x-3">
              <img className="w-[72px] h-[72px]" src={Logo} alt="test" />
              <div className="flex flex-col">
                <div className="text-body2">สวัสดี</div>
                <div className="text-body1 font-bold">ครอบครัวหมูเด้ง</div>
                <div className="text-small">รหัสครอบครัว - 24GENZ0001</div>
              </div>
            </div>
            <i className="fa-solid fa-user-group text-h2"></i>
          </div>

          <div className="pad-main mb-2">
            <div className="flex justify-between text-center mb-2">
              <div className="text-body2 font-semibold">สถานะกิจกรรม</div>
              <div className="text-small underline">ดูทั้งหมด</div>
            </div>
            <div className="wrap-items-center space-y-2">
              {status.map((status: IDataStatusCard, index: number) => (
                <div key={index} className="w-full">
                  <StatusCard data={status} />
                </div>
              ))}
            </div>
          </div>

          <div className="pad-main space-y-2 mb-2">
            <div className="flex justify-between text-center">
              <div className="text-body2 font-semibold">สำรวจเมนูใหม่</div>
              <div className="text-small underline">ดูทั้งหมด</div>
            </div>
            <div className="flex w-full overflow-x-auto space-x-2 scrollbar-hide">
              {menus.map((menu: IDataMenuCard, index: number) => (
                <div key={index} className="flex-shrink-0">
                  <MenuCard data={menu} />
                </div>
              ))}
            </div>
          </div>

          <div className="pad-main space-y-2 mb-2">
            <div className="text-body2 font-semibold">สถิติการทำภารกิจ</div>
            <div className="wrap-items-center space-y-2">
              {status.map((status: IDataStatusCard, index: number) => (
                <div key={index} className="w-full">
                  <StatusCard data={status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
