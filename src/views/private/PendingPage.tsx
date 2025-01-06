import MenuCard, {
  PendingMenuCard,
  IDataMenuCard,
} from "@/components/menu-card/MenuCard";
import { Link } from "react-router-dom";

export default function PendingPage() {
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
    <div className="pad-main space-y-3">
      <Link
        to="/family"
        className="flex w-fit items-center space-x-3 previous-page"
      >
        <i className="fa-solid fa-arrow-left text-h2"></i>
        <div className="text-body2 font-semibold">ย้อนกลับ</div>
      </Link>
      <div className="text-body2 font-semibold">
        กิจกรรมที่กำลังดำเนินการทั้งหมด
      </div>
      <div className="flex flex-col items-center justify-center w-full py-5 rounded-md border border-org-main">
        <div className="text-h1 font-bold">{menus.length}</div>
        <div className="text-body1 font-semibold">กิจกรรม</div>
      </div>

      <div className="text-body2 font-semibold">รายการกิจกรรม</div>
      <div className="wrap-items-center space-y-2">
        {menus.map((menu: IDataMenuCard, index: number) => (
          <Link to="/activity" key={index} className="w-full">
            <PendingMenuCard data={menu} />
          </Link>
        ))}
      </div>

      <div className="text-body2 font-semibold">กิจกรรมแนะนำสำหรับคุณ</div>
      <div className="flex w-full overflow-x-auto space-x-2 scrollbar-hide">
        {menus.map((menu: IDataMenuCard, index: number) => (
          <div key={index} className="flex-shrink-0">
            <MenuCard data={menu} />
          </div>
        ))}
      </div>
    </div>
  );
}
