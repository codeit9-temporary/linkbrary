import React, { ReactNode, ButtonHTMLAttributes, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  width?: string;
  height?: string;
  radius?: string;
  color?: "positive" | "negative";
  size?: string;
}

const SubmitButton = ({
  children,
  width = "auto",
  height = "53px",
  radius = "8px",
  color = "positive",
  size = "18px",
  className = "",
  onClick,
  disabled,
  ...props
}: ButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading || disabled) return;

    try {
      setIsLoading(true);
      if (onClick) await onClick(e);
    } catch (error) {
      console.error("버튼 클릭 중 에러 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const backgroundStyle =
    color === "positive"
      ? "linear-gradient(90.99deg, #6D6AFE 0.12%, #6AE3FE 101.84%)"
      : "#FF5B56";

  return (
    <button
      style={{
        borderRadius: radius,
        background: backgroundStyle,
      }}
      className={`flex justify-center items-center ${width} ${height} ${size} ${className} text-white font-[600] hover:opacity-90 ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleClick}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <div className="h-full">
          <LoadingSpinner size={25} />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitButton;
