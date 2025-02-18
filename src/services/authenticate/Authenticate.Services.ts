import { gateway } from "@/helpers/configs";
import { IFormInitial } from "@/@types/authentication/ILogin";

export async function LoggedIn(data: IFormInitial) {
  try {
    const response = await gateway.post(`/auth/login`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function Registration(data: FormData) {
  try {
    const response = await gateway.post(`/auth/register`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
