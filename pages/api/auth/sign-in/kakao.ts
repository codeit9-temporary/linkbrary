import axiosInstance from "@/lib/api/axiosInstanceApi";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ message: "인증 코드가 없습니다." });
    }

    const redirectUri =
      process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_SIGN_IN || "/";

    try {
      const loginResponse = await axiosInstance.post("/auth/sign-in/kakao", {
        token: code,
        redirectUri,
      });

      const accessToken = loginResponse.data.access_token;
      if (accessToken) {
        res.setHeader(
          "Set-Cookie",
          serialize("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
            path: "/",
          })
        );
        return res.redirect("/");
      }
    } catch (loginError: any) {
      console.error(
        "로그인 실패:",
        loginError.response?.data || loginError.message
      );
      return res.redirect("/signup");
    }
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
    return res.status(500).json({
      message: "서버 오류",
      error: error.response?.data || error.message,
    });
  }
};

export default handler;
