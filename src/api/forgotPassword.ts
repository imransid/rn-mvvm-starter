
import axios from "axios";

const API_BASE = "https://api.zenfamy.ai/api/v1/auth";

export interface ForgotPasswordPayload {
  email: string;
}

export const forgotPasswordRequestAPI = async (data: ForgotPasswordPayload) => {
  try {
    const response = await axios.post(`${API_BASE}/forgot-password`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    // Axios error handling
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error(error.message || "Forgot password request failed");
    }
  }
};
