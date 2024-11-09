import axiosInstance, { proxy } from "./axiosInstanceApi";

interface signInProps {
  email: string;
  password: string;
}

interface signUpProps extends signInProps {
  name: string;
}

interface easySignInProps {
  token: string;
  redirectUri: string;
}

interface easySignUpProps extends easySignInProps {
  name: string;
}

// 회원가입
export const postSignUp = async (body: signUpProps) => {
  try {
    const res = await proxy.post("api/auth/sign-up", body);
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};

// 로그인
export const postSignIn = async (body: signInProps) => {
  try {
    const res = await proxy.post("/api/auth/sign-in", body);
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};

// 간편 회원가입
export const postEasySignUp = async (
  provider: "google" | "kakao",
  body: easySignUpProps
) => {
  try {
    const res = await axiosInstance.post(`/auth/sign-up/${provider}`, body);
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};

// 간편 로그인
export const postEasySignIn = async (
  provider: "google" | "kakao",
  body: easySignInProps
) => {
  try {
    const res = await axiosInstance.post(`/auth/sign-in/${provider}`, body);
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};
