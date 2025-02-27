/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ChangeEvent, useEffect, useRef, useState } from "react";

export interface UploadFileProps {
  accept: string;
  clearImage: boolean;
  onFileChange: (file: File | null) => void;
}

export default function UploadFile({
  accept,
  onFileChange,
  clearImage,
}: UploadFileProps) {
  const [imgSource, setImgSource] = useState<string | null>(null);
  const [imgFilename, setImgFilename] = useState<string | null>(null);
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
      setImgFilename(file.name);
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
            className="w-[250px] h-[250px] p-1 rounded-full object-cover"
          />
        ) : (
          <div className="w-[250px] cursor-pointer rounded-full border-2 border-dashed border-org-main h-[250px] flex flex-col justify-center items-center">
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
          <p className="whitespace-nowrap overflow-hidden text-ellipsis w-40 text-center">
            {imgFilename}
          </p>
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

export function UploadFileSquare({
  accept,
  onFileChange,
  clearImage,
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
            className="w-[250px] h-[250px] p-1 rounded-md object-cover"
          />
        ) : (
          <div className="w-[250px] rounded-md cursor-pointer border-2 border-dashed border-org-main h-[250px] flex flex-col justify-center items-center">
            <i className="fa-solid fa-plus text-[48px] text-org-main"></i>
            <span className="py-3 text-[16px] font-medium">
              อัพโหลดรูปภาพของคุณ
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
