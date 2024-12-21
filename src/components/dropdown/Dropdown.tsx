/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, ReactNode } from "react";

export function Select({ selectType = "", ...props }: any) {
  switch (selectType) {
    case "object":
      return <div {...props}>{props.value}</div>;
    default:
      return <input readOnly {...props} />;
  }
}

interface Props {
  isMultiDefault?: string;
  name?: string;
  placeholder?: string;
  options?: any;
  value?: any;
  isLoading?: boolean;
  messageLoading?: string;
  messageNoData?: string;
  className?: string;
  onChange?: any;
  optionValue?: string;
  optionLabel?: any;
  title?: string;
  isMulti?: boolean;
  disabled?: boolean;
  openError?: boolean;
  messageNoDataStyle?: string;
  titleElement?: ReactNode;
  touched?: any;
  error?: any;
}

export default function Dropdown({ options, value, disabled = false, isMultiDefault = "", name = "", touched, error, placeholder = "", isLoading = false, messageLoading = "กำลังโหลดข้อมูล...", messageNoData = "ไม่พบข้อมูล", messageNoDataStyle = "", className = "", onChange = false,  optionValue = "value", optionLabel = false, title = "", isMulti = false, titleElement, ...props }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [searchKey, setSearchKey] = useState<string>("");

  useEffect(() => {
    if (open) {
      document.getElementById(`search-${name}`)?.focus();
      if (options.length > 0) {
        const result = options.map(function (item: any) {
          return {
            [optionValue]: item[optionValue],
            labelOptions: options.filter((a: any) => a[optionValue] === item[optionValue]).map(optionLabel ? optionLabel : (a: any) => a["label"]).toString(),
            options: item,
          };
        });
        setData(searchKey ? result.filter((a: any) => a.labelOptions.toLowerCase().includes(searchKey.toLowerCase())) : result);
      } else {
        setData([]);
      }
    }
  }, [name, open, optionLabel, optionValue, options, searchKey, value]);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(!open);
        setSearchKey("");
        setShowAll(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [open]);

  function SetValue(data: any) {
    let value = "";
    if (data.length > 0) {
      if (data.length === 1) {
        if (Array.isArray(data[0])) {
          value = data[0][0].split(" ").filter((a: any) => a !== "").join(" ");
        } else {
          value = data[0].split(" ").filter((a: any) => a !== "").join(" ");
        }
      } else {
        value = data;
      }
    }
    return value;
  }

return (
      <div className="w-full relative" ref={ref}>
        <div className="flex justify-between">
            <label htmlFor={`select-${name}`} className="w-full pb-2 font-medium">
                {title}
            </label>
            {titleElement && titleElement}
        </div>
        <div className="flex items-center relative">
          <Select
            {...props}
            id={`select-${name}`}
            disabled={disabled ? disabled : false}
            value={value.length > 0 && Array.isArray(value) ? (isMulti ? (isMultiDefault ? isMultiDefault : `${value.length} รายการ`) : SetValue(value.map(optionLabel ? optionLabel : (a) => a["label"]))) : placeholder ? placeholder : "- เลือก -"}
            selectType={typeof (value.length > 0 && Array.isArray(value) && value.map(optionLabel ? optionLabel : (a) => a["label"])[0])}
            name={name}
            className={`${className} ${touched ? (error ? 'inputError' : 'inputSuccess') : 'inputDefault'} pr-8 w-full ${disabled ? "inputDisable pr-8" : ""}`}
            onClick={() => {
              setOpen(!open);
              setSearchKey("");
              setShowAll(false);
            }}
          />
          <i className="fas fa-angle-down -ml-6 fill-current text-gray text-base"></i>
        </div>
        <div className={`border rounded-md shadow-sm mt-3 p-2 w-full absolute z-[50] bg-white ${!open && "hidden"}`}>
          <ul className={`list-none max-h-64 ${open ? "overflow-y-auto" : ""}`}>
            {isLoading ? (
              <li className="p-2 rounded-md">
                <span>{messageLoading}</span>
              </li>
            ) : data.length === 0 ? (
              <li className={`p-2 rounded-md ${messageNoDataStyle}`}>
                <span>{messageNoData}</span>
              </li>
            ) : (
              data.slice(0, showAll ? data.length : 50).map((item: any, index: number) => (
                <li
                  key={optionValue ? item[optionValue] : index}
                  className={`p-2 rounded-md my-[2px] hover:bg-org-main hover:text-white cursor-pointer font-light ${Array.isArray(value) && value.filter((a) => a[optionValue] === item[optionValue]).length > 0 && "bg-org-main text-white"}`}
                  onClick={() => {
                    onChange(item.options);
                    setOpen(!open);
                    setSearchKey("");
                    setShowAll(false);
                    document.getElementById(`select-${name}`)?.focus();
                  }}
                >
                  {item.labelOptions}
                </li>
              ))
            )}
            {data.length > 50 && !isLoading && (
              <li
                className="p-2 rounded-md text-center hover:bg-blue-s5 cursor-pointer"
                onClick={() => {
                  setShowAll(!showAll);
                }}
              >
                <span>{showAll ? "-- แสดงน้อยลง --" : "-- แสดงทั้งหมด --"}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
  );
}

