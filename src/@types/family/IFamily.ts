import { IFile } from "../global";

export interface IFormFamily {
  famImg: IFile;
  famName: string;
  nickName: string;
  famRole: number;
}

export interface IFormDataFamily {
  famName: string;
  nickName: string;
  famRole: number;
  famImg: File | string;
  famImgName: string;
}

export interface IFormJoinFamily {
  famCode: string;
  nickName: string;
}
