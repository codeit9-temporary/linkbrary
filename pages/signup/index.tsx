import AuthInput from "@/components/Auth/AuthInput";
import SubmitButton from "@/components/SubMitButton";
import AuthLayout from "@/components/Layout/AuthLayout";
import Link from "next/link";
import useForm from "@/hooks/useForm";

const Signup = () => {
  const { values, errors, handleChange, handleBlur, handleSubmit } =
    useForm(true);

  return (
    <div className="bg-gray100 min-h-screen">
      <AuthLayout>
        <p className="mt-[16px] text-base font-normal">
          이미 회원이신가요?{" "}
          <Link
            href="/login"
            className="cursor-pointer text-purple100 underline font-semibold"
          >
            로그인하기
          </Link>
        </p>
        <form
          className="w-full sm:max-w-[325px] md:max-w-[400px] lg:max-w-[400px] mt-[30px] h-full"
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
            text="이름"
            type="text"
            name="nickname"
            placeholder="이름을 입력해주세요."
            value={values.nickname}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.nickname}
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
          <AuthInput
            text="비밀번호"
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호를 입력해주세요."
            value={values.passwordConfirm}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.passwordConfirm}
          />
          <SubmitButton width="w-full" height="h-[53px]" className="mt-[30px]">
            회원가입
          </SubmitButton>
        </form>
      </AuthLayout>
    </div>
  );
};

export default Signup;
