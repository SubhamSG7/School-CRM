import axios from "axios";
const url = import.meta.env.VITE_BackendURL;

export async function getTeachersDetails() {
  try {
    const response = await axios.get(`${url}/api/teachersdata`, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}
