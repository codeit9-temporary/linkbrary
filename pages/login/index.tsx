import useForm from "@/hooks/useForm";
import AuthInput from "@/components/Auth/AuthInput";
import SnsLogin from "@/components/Auth/SnsLogin";
import SubmitButton from "@/components/SubMitButton";
import AuthLayout from "@/components/Layout/AuthLayout";
import Link from "next/link";

const Login = () => {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isFormInvalid,
  } = useForm(false);

  return (
    <div className="bg-gray100 min-h-screen">
      <AuthLayout>
        <p className="mt-[16px] text-base font-normal">
          회원이 아니신가요?{" "}
          <Link
            href="/signup"
            className="cursor-pointer text-purple100 underline font-semibold"
          >
            회원 가입하기
          </Link>
        </p>
        <form
          className="w-full sm:max-w-[325px] md:max-w-[400px] lg:max-w-[400px] mt-[30px]"
          aria-labelledby="login-form"
          onSubmit={handleSubmit}
        >
          <AuthInput
            text="이메일"
            type="text"
            name="email"
            placeholder="이메일을 입력해주세요."
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
          />
          <AuthInput
            text="비밀번호"
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
          />
          <SubmitButton
            type="submit"
            width="w-full"
            height="h-[53px]"
            className="mt-[30px]"
            disabled={isFormInvalid()}
          >
            로그인
          </SubmitButton>
          <SnsLogin />
        </form>
      </AuthLayout>
    </div>
  );
};

export default Login;
