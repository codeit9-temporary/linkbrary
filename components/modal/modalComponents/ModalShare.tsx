import { useEffect } from "react";
import { handleCopyUrl } from "@/util/copyUrl";
import { handleShareFacebook, handleShareKakao } from "@/util/shareSNS";
import ModalShareItem from "./ModalShareItem";

const ModalShare = () => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);

  return (
    <div className="flex gap-8">
      <div onClick={handleShareKakao}>
        <ModalShareItem src="/icons/Kakao.svg" text="카카오톡" bg="#FEE500" />
      </div>
      <div onClick={handleShareFacebook}>
        <ModalShareItem
          src="/icons/Facebook.svg"
          text="페이스북"
          bg="#1877F2"
        />
      </div>
      <div onClick={handleCopyUrl}>
        <ModalShareItem
          src="/icons/link.svg"
          text="링크 복사"
          bg="rgba(157, 157, 157, 0.04)"
          color="#6D6AFE"
        />
      </div>
    </div>
  );
};
export default ModalShare;
