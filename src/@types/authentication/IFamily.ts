import { IFile } from "../global";

export interface IFormFamily {
    famImg: IFile;
    famName: string;
    nickName: string;
}

export interface IFormDataFamily {
    famName: string;
    nickName: string;
    famImg: File | string;
    famImgName: string;
}