/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from "react";

export interface TextFieldTypes {
    label: string;
    groupClass?: string;
    inputClass?: string;
    type?: string;
    name: string;
    id?: string;
    placeHolder?: string;
    value: string;
    onChange?: (val: ChangeEvent<HTMLInputElement>) => void;
    onChangeTel?: (val: string) => void;
    required?: boolean;
    maxLength?: number;
    pattern?: string;
    touched?: any;
    error?: any;
}

export interface IFile {
  file: File | string;
  filename: string
}

export interface IOptionDDL {
  id: string;
  name: string
}