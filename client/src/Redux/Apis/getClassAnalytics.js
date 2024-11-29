import axios from "axios";

const url = import.meta.env.VITE_BackendURL;
export async function getClassAnalytics(data) {
  try {
    const resp = await axios.post(`${url}/api/classanalytics`, data, {
      withCredentials: true,
    });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
}
