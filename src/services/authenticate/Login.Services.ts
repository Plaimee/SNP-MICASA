import { IFormInitial } from '@/@types/authentication/ILogin';
import { authLogin } from '@/helpers/configs';

export async function LoggedIn(data: IFormInitial) {
  try {
    const response = await authLogin.post(`auth/login`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
