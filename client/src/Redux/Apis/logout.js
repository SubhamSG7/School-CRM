import axios from "axios";
const url = import.meta.env.VITE_BackendURL;

export async function LogOut() {
  try {
    const resp = await axios.get(`${url}/api/logout`, {
      withCredentials: true,
    });

    return resp?.data;
  } catch (error) {
    console.log(error);
  }
}
