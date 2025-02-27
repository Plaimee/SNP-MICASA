import { IFormCreateAccount } from "./authentication/IRegister";
import { IFamilyData } from "./family/IFamily";

export interface IFamilyStateLocation {
  famData: IFamilyData | null;
}

export interface IStateLocationRegister {
  account: IFormCreateAccount;
}

export interface IStateLocationJoinFamily {
  famCode: string;
}
