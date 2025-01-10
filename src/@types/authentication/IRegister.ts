import { IFile } from "../global";

export interface IFormCreateAccount {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IFormRegister {
  profile: IFile;
  fname: string;
  lname: string;
  gender: string;
  familyRole: string;
}

export interface IFormDataRegister {
  email: string;
  password: string;
  fname: string;
  lname: string;
  gender: string;
  familyRole: string;
  profile: File | string;
  profileFilename: string;
}
