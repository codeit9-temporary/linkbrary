import useModalStore from "@/store/useModalStore";
import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface AddFolderButtonProps {
  isModal?: boolean;
}

export const AddFolderButton = ({ isModal = false }: AddFolderButtonProps) => {
  const { isOpen, openModal } = useModalStore();
  const queryClient = useQueryClient();
  const isFirstRender = useRef(true); // 첫 번째 렌더링 여부를 추적하는 ref

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!isOpen) {
      queryClient.invalidateQueries({ queryKey: ["folderList"] });
      isFirstRender.current = true;
    }
  }, [isOpen, queryClient]);

  return (
    <button
      className={
        !isModal
          ? "md:mt-auto xl:mt-0 text-purple100"
          : "fixed-bottom w-[120px] h-[35px] rounded-[20px] bg-purple100 text-white hover:bg-purple50"
      }
      onClick={() => openModal("AddFolderModal")}
    >
      폴더 추가 +
    </button>
  );
};
export default AddFolderButton;
