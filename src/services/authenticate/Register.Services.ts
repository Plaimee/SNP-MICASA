import { authRegister } from '@/helpers/configs';

export async function Registeration(data: FormData) {
  try {
    const response = await authRegister.post(`auth/register`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
