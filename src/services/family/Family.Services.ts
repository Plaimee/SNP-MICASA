import { gateway } from "@/helpers/configs";

export async function ReadFamily(famCode: string) {
  try {
    const response = await gateway.get(`/family/${famCode}`);
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

export async function JoinFamily(data: FormData) {
  try {
    const response = await gateway.post(`/family/join`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
