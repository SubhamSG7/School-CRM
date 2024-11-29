import axios from "axios";

const url = import.meta.env.VITE_BackendURL;
export async function getPaymentDetails() {
  try {
    const resp = await axios.get(`${url}/api/paymentdetail`, {
      withCredentials: true,
    });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
}
