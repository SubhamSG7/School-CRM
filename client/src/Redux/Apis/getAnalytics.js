import axios from "axios";

const url = import.meta.env.VITE_BackendURL;
export async function getAnalytics(type) {
  try {
    const response = await axios.post(`${url}/api/getanalytics`, type, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}
