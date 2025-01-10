import Swal from "sweetalert2";

interface IProps {
  type: "success" | "error" | "question" | "warning" | "info";
  timer?: number;
  title?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  showCloseButton?: boolean;
  focusConfirm?: boolean;
  icon?: string;
}

export default function AlertMessage({
  icon,
  cancelButtonText = "ยกเลิก",
  confirmButtonText = "ตกลง",
  type = "success",
  title = "",
  text = "",
  timer = 2500,
  showCancelButton = false,
  showConfirmButton = false,
  ...props
}: IProps) {
  let iconDefault = "";
  let color: string = "";
  let cancelButtonClass: string = "";

  switch (type) {
    case "success":
      color = "#12A90F";
      cancelButtonClass = "cancel-button-success";
      iconDefault = `<div class="w-[90px] h-[90px] bg-[#EBFFE2] flex items-center justify-center rounded-full">
                       <i class="${
                         icon ? icon : "fa-regular fa-circle-check"
                       } text-[2.5em] text-[#12A90F]"></i>
                    </div>`;
      break;
    case "warning":
      color = "#fab81b";
      cancelButtonClass = "cancel-button-warning";
      iconDefault = `<div class="w-[90px] h-[90px] bg-[#FFFAEE] flex items-center justify-center rounded-full">
                       <i class="${
                         icon ? icon : "fa-solid fa-exclamation"
                       } text-[2.5em] text-[#fab81b]"></i>
                    </div>`;
      break;
    case "error":
      color = "#F15A5B";
      cancelButtonClass = "cancel-button-error";
      iconDefault = `<div class="w-[90px] h-[90px] bg-[#FFF3F3] flex items-center justify-center rounded-full">
                       <i class="${
                         icon ? icon : "fa-solid fa-xmark"
                       } text-[2.5em] text-[#F15A5B]"></i>
                    </div>`;
      break;
    case "question":
      color = "#3D6890";
      cancelButtonClass = "cancel-button-question";
      iconDefault = `<div class="w-[90px] h-[90px] bg-[#E8F3FF] flex items-center justify-center rounded-full">
                       <i class="${
                         icon ? icon : "fa-solid fa-question"
                       } text-[2.5em] text-[#3D6890]"></i>
                    </div>`;
      break;
    case "info":
      color = "#2EBEE2";
      cancelButtonClass = "cancel-button-info";
      iconDefault = `<div class="w-[90px] h-[90px] bg-[#e0f4fe] flex items-center justify-center rounded-full">
                         <i class="${
                           icon ? icon : "fa-solid fa-info"
                         } text-[2.5em] text-[#2EBEE2]"></i>
                      </div>`;
      break;
  }

  return Swal.fire({
    html: `<div class="w-full h-full flex flex-col justify-center">
            <div>
              <div class="w-full flex justify-center items-center">
                ${iconDefault}
              </div>
            <div class="relative w-full flex items-center px-3">
              <div class="w-full mt-5 text-center">
                <h2 class="font-medium">${title}</h2>
                <h4 class="font-light mt-2 text-[12px] sm:text-[14px] md:text-[16px]">${text}</h4>
              </div>
            </div>
           </div>
        </div>`,
    // confirm
    confirmButtonColor: color,
    confirmButtonText: type === "question" ? "ใช่" : confirmButtonText,
    showConfirmButton: showConfirmButton,
    //cancel
    cancelButtonText: type === "question" ? "ไม่" : cancelButtonText,
    showCloseButton: false,
    showCancelButton: showCancelButton,
    customClass: { cancelButton: cancelButtonClass },
    focusConfirm: false,
    timer: type === "success" ? timer : 0,
    ...props,
  });
}
