import { gateway } from "@/helpers/configs";

export async function CreateActivity(data: FormData) {
  try {
    const response = await gateway.post(`/activity/create`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function UpdateActivity(act_id: number, data: FormData) {
  try {
    const response = await gateway.post(`/activity/update=${act_id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function ReadActivity(fam_id: number) {
  try {
    const response = await gateway.get(`/activity/read=${fam_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function ReadActivityById(act_id: number) {
  try {
    const response = await gateway.get(`/activity/read_id=${act_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
