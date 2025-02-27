import { IFile } from "../global";

export interface IFormCreatePost {
  usrId: number;
  postType: string;
  postDesc: string;
  postImg: IFile;
  postComment: string;
  postLike: string;
}
