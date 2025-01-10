import { IFile } from "../global";

export interface IFormFamily {
  usrId: number;
  famName: string;
  famProfile: IFile;
  nickName: string;
}

export interface IFormDataFamily {
  usrId: number;
  famName: string;
  nickName: string;
  roleId: string;
  file: File | string;
  filename: string;
}
