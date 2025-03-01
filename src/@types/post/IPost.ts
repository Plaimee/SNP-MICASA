import { IFile } from "../global";

export interface IFormCreatePost {
  user_id: number;
  user_name: string;
  user_profile: string;
  postType: string;
  postDesc: string;
  postImg: IFile;
  postComment: string;
  postLike: string;
}

export interface IPostData {
  id: number;
  user: IPostUser;
  post_type: string;
  post_desc: string;
  post_images: IPostImages[];
  post_likes: IPostLikes[];
  post_comments: IPostComment[];
  post_shares: number;
  created_at: string;
}

export interface IPostImages {
  images: string;
}

export interface IPostUser {
  user_id: number;
  user_name: string;
  user_profile: string;
}

export interface IPostLikes {
  user_id: number;
}

export interface IPostComment {
  id: number;
  user_id: number;
  comment_text: string;
  created_at: string;
}
