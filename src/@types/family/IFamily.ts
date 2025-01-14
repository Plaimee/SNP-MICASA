import { IFile } from '../global';

export interface IFormFamily {
  usrId: number;
  famName: string;
  famProfile: IFile;
  nickName: string;
  roleId: number;
  usrProfile: string;
}

export interface IFormDataFamily {
  famName: string;
  nickName: string;
  roleId: number;
  file: File | string;
  filename: string;
}

export interface IFamilyData {
  id: number;
  famName: string;
  profile: string;
  famCode: string;
  famMember: IFamilyMember[];
  created_at: string;
}

export interface IFamilyMember {
  id: string;
  roleId: string;
  nickName: string;
  usrImg: string;
}

export interface IFormJoinFamily {
  usrId: number;
  famCode: string;
  nickName: string;
  roleId: number;
  usrProfile: string;
}

export interface IFamilyStateLocation {
  famData: IFamilyData | null;
}
