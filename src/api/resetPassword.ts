import axios from "axios";

export const resetPassword = async (
  email: string,
  otp_code: string,
  password: string
) => {
  try {
    const response = await axios.post(
      "https://api.zenfamy.ai/api/v1/auth/reset-password",
      {
        email,
        otp_code,
        password,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    console.log('ddd',   email,
        otp_code,
        password, response)

    return response.data;
  } catch (error: any) {

    console.log('error', error)

    throw error.response?.data || { message: error.message };
  }
};
