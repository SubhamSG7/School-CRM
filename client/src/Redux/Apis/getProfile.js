import axios from "axios";

const url = import.meta.env.VITE_BackendURL;
export async function getProfile() {
  try {
    const resp = await axios.get(`${url}/api/profile`, {
      withCredentials: true,
    });
    return resp?.data.data;
  } catch (error) {
    console.log(error);
  }
}
