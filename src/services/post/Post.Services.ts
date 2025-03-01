import { gateway } from "@/helpers/configs";

export async function ReadAll() {
  try {
    const response = await gateway.get(`/post`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function ReadById(data: number) {
  try {
    const response = await gateway.get(`/post/${data}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function CreatePost(data: FormData) {
  try {
    const response = await gateway.post(`/post/create`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function UpdateLike(postId: number, userId: number) {
  try {
    const response = await gateway.post(
      `/post/${postId}/like`,
      { userId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
