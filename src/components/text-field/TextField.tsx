import { TextAreaFieldTypes, TextFieldTypes } from "@/@types/global";
import { ChangeEvent, useState } from "react";

export default function TextField({
  groupClass,
  label,
  inputClass,
  type,
  name,
  id,
  placeHolder,
  value,
  onChange,
  onChangeTel,
  required,
  maxLength,
  pattern,
  touched,
  error,
}: TextFieldTypes) {
  const [formattedValue, setFormattedValue] = useState(value);

  function formatPhoneNumber(input: string) {
    const cleanedInput = input.replace(/\D/g, "");

    let formatted = "";
    for (let i = 0; i < cleanedInput.length; i++) {
      if (i === 3 || i === 6) {
        formatted += " ";
      }
      formatted += cleanedInput[i];
    }
    return formatted;
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const formattedInput = formatPhoneNumber(inputValue);
    setFormattedValue(formattedInput);

    if (type === "tel" && onChangeTel) {
      onChangeTel(inputValue);
    } else if (onChange) {
      onChange(e);
    }
  }

  return (
    <div className={`input-group ${groupClass}`}>
      <label htmlFor={label} className="w-full pb-2 font-medium">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeHolder}
        value={type == "tel" ? formattedValue : value}
        onChange={type === "tel" ? handleInputChange : onChange}
        required={required ? required : false}
        className={`${inputClass} ${
          touched ? (error ? "inputError" : "inputSuccess") : "inputDefault"
        } `}
        maxLength={maxLength}
        pattern={pattern}
      />
    </div>
  );
}

export function TextAreaField({
  groupClass,
  label,
  inputClass,
  name,
  id,
  placeHolder,
  value,
  onChange,
  required,
  maxLength,
  touched,
  error,
  rows,
}: TextAreaFieldTypes) {
  return (
    <div className={`input-group ${groupClass}`}>
      <label htmlFor={label} className="w-full pb-2 font-medium">
        {label}
      </label>
      <textarea
        name={name}
        id={id}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        required={required ? required : false}
        className={`${inputClass} ${
          touched ? (error ? "inputError" : "inputSuccess") : "inputDefault"
        } `}
        maxLength={maxLength}
        rows={rows}
      />
    </div>
  );
}
