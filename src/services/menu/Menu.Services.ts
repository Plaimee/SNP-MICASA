import { gateway } from "@/helpers/configs";

export async function ReadMenu() {
  try {
    const response = await gateway.post(`/menu`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function CreateMenu(data: FormData) {
  try {
    const response = await gateway.post(`/menu/create`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
