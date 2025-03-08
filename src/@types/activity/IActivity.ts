export interface ICreateActivity {
  user_id: number;
  menu_id: number;
  menu_title: string;
  menu_images: string;
  menu_category: string;
  fam_id: number;
  fam_mem_id: string;
  fam_mem_nickName: string;
  fam_mem_image: string;
  purchase_type: string;
  status_type: string;
}

export interface IUpdateActivity {
  completed_at: string;
  status_type: string;
}

export interface IActivityData {
  id: number;
  fam_id: number;
  menu: ISelectMenu;
  member: ISelectMember;
  purchase_type: string;
  status_type: string;
}

export interface ISelectMenu {
  menu_id: number;
  menu_title: string;
  menu_images: string;
  menu_category: string;
}

export interface ISelectMember {
  fam_mem_id: string;
  fam_mem_nickName: string;
  fam_mem_image: string;
}
