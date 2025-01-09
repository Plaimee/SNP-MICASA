import { IFile } from '../global';

export interface IFormFamily {
  userid: number;
  famName: string;
  famProfile: IFile;
  roleId: number;
  nickName: string;
  profile: string;
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

export interface IFormActivityDuty {
  famDuty: string;
}
