/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ChangeEvent, useEffect, useRef, useState } from "react";

export interface UploadFileProps {
  accept: string;
  clearImage: boolean;
  onFileChange: (file: File | null) => void;
  variant?: "circle" | "square";
}

export default function UploadFile({
  accept,
  onFileChange,
  clearImage,
  variant = "circle",
}: UploadFileProps) {
  const [imgSource, setImgSource] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    clearImage &&
      (setImgSource(null),
      fileInputRef.current && fileInputRef.current.value === "");
  }, [clearImage]);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
      setImgSource(URL.createObjectURL(file));
    } else {
      onFileChange(null);
      setImgSource(null);
    }
  }

  return (
    <div className="w-full">
      <div
        className="flex justify-center items-center"
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        {imgSource ? (
          <img
            src={imgSource}
            alt="Profile Image"
            className={`w-[250px] h-[250px] p-1 object-cover ${
              variant === "circle" ? "rounded-full" : "rounded-md"
            }`}
          />
        ) : (
          <div
            className={`w-[250px] h-[250px] border-2 border-dashed border-org-main flex flex-col justify-center items-center ${
              variant === "circle" ? "rounded-full" : "rounded-md"
            }`}
          >
            <i className="fa-solid fa-image text-[48px] text-org-main"></i>
            <span className="py-3 text-[16px] font-medium">
              อัพโหลดรูปภาพของคุณ
            </span>
            <span className="text-[14px] text-balance text-center">
              ขนาดรูปภาพไม่เกิน 10 MB และนามสกุลไฟล์ .jpg, .png
            </span>
          </div>
        )}
      </div>
      <input
        accept={accept}
        type="file"
        name="profile"
        id="profile"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {imgSource && (
        <div className="w-full mt-3 flex flex-col gap-y-2 items-center">
          <button
            type="button"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="btn-bfl btn-main"
          >
            เปลี่ยนรูปภาพ
          </button>
        </div>
      )}
    </div>
  );
}
