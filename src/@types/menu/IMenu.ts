import { IFile } from "../global";

export interface IMenuData {
  id: number;
  menu_title: string;
  menu_category: string;
  menu_image: string;
  created_at: string;
}

export interface ICreateMenu {
  menu_title: string;
  menu_category: string;
  menu_image: IFile;
}
