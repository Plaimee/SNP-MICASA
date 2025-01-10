import { gateway } from "@/helpers/configs";
import { IFormInitial } from "@/@types/authentication/ILogin";

export async function JoinFamily(data: IFormInitial) {
  try {
    const response = await gateway.post(`/family/join`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function CreateFamily(data: FormData) {
  try {
    const response = await gateway.post(`/family/create`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
