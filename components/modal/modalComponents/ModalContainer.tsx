import { IoIosClose } from "react-icons/io";
import SubmitButton from "../../SubMitButton";
import { ModalPropType } from "@/types/modalTypes";
import useModalStore from "@/store/useModalStore";
import { MouseEvent, useRef } from "react";

const ModalContainer = ({
  title,
  subtitle,
  children,
  buttonText,
  buttonColor,
}: ModalPropType) => {
  const { closeModal } = useModalStore();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const onClickBackDrop = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node))
      closeModal();
  };

  return (
    <div
      onClick={onClickBackDrop}
      className="z-30 absolute top-0 left-0 flex justify-center items-center bg-black/40 h-screen w-screen"
    >
      <div
        ref={modalRef}
        className="z-20 relative w-[300px] md:w-[360px] lg:w-[360px] py-8 px-10 flex flex-col gap-6 bg-white rounded-[15px] border border-gray300"
      >
        {/* 제목 + 부제목 */}
        <div className="flex flex-col items-center justify-center gap-2">
          {title && (
            <div className="text-center w-[250px] md:w-[280px] lg:w-[280px] gap-2 text-black300 text-xl leading-6 font-bold">
              {title}
            </div>
          )}
          {subtitle && (
            <div className="text-sm leading-[22px] font-normal text-gray400">
              {subtitle}
            </div>
          )}
        </div>
        {/* children -> inpul, sns공유, folder list 등.. */}
        <div className="flex justify-center items-center flex-col">
          {children && <>{children}</>}

          {/* 제출 버튼 */}
          {buttonText && (
            <SubmitButton
              type="button"
              width="w-full"
              height="h-[51px] "
              color={buttonColor}
            >
              {buttonText}
            </SubmitButton>
          )}
        </div>

        {/* 모달 닫기 버튼 */}
        <button
          type="button"
          onClick={() => closeModal()}
          className="bg-gray200 absolute top-4 right-4 rounded-full size-6 flex justify-center items-center"
        >
          <IoIosClose className="text-gray400" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};
export default ModalContainer;
