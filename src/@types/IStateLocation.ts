import { IFormCreateAccount } from "./authentication/IRegister";

export interface IStateLocationRegister {
  account: IFormCreateAccount;
}

export interface IStateLocationJoinFamily {
  famCode: string;
}
