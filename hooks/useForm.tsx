import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import { postSignIn, postSignUp } from "@/lib/api/auth";
import { TbWashDryP } from "react-icons/tb";

interface FormValues {
  email: string;
  password: string;
  nickname?: string;
  passwordConfirm?: string;
}

const INITIAL_VALUES: FormValues = {
  email: "",
  password: "",
  nickname: "",
  passwordConfirm: "",
};

const useForm = (isSignUp = false) => {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormValues>(INITIAL_VALUES);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      if (!value) {
        setErrors((prev) => ({
          ...prev,
          email: "이메일을 입력해주세요.",
        }));
      } else if (!validateEmail(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "잘못된 이메일 형식입니다.",
        }));
      }
    } else if (isSignUp && name === "nickname") {
      if (!value) {
        setErrors((prev) => ({
          ...prev,
          nickname: "이름을 입력해주세요.",
        }));
      }
    } else if (name === "password") {
      if (!value) {
        setErrors((prev) => ({
          ...prev,
          password: "비밀번호를 입력해주세요.",
        }));
      } else if (value.length < 8) {
        setErrors((prev) => ({
          ...prev,
          password: "비밀번호를 8자 이상 입력해주세요.",
        }));
      }
    } else if (isSignUp && name === "passwordConfirm") {
      if (value !== values.password) {
        setErrors((prev) => ({
          ...prev,
          passwordConfirm: "비밀번호가 일치하지 않습니다.",
        }));
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isFormInvalid()) return;
    const { email, password, nickname } = values;

    if (isSignUp) {
      const data = await postSignUp({ email, password, name: nickname || "" });

      if (data) {
        router.push("/login");
      } else {
        alert("회원가입 실패: 이메일 또는 비밀번호를 확인해주세요.");
      }
    } else {
      const data = await postSignIn({ email, password });

      if (data) {
        router.push("/");
      } else {
        alert("로그인 실패: 이메일 또는 비밀번호를 확인해주세요.");
      }
    }

    setValues(INITIAL_VALUES);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormInvalid = () =>
    !values.email ||
    !values.password ||
    !!errors.email ||
    !!errors.password ||
    (isSignUp &&
      (!values.nickname ||
        !values.passwordConfirm ||
        !!errors.nickname ||
        !!errors.passwordConfirm));

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isFormInvalid,
  };
};

export default useForm;
