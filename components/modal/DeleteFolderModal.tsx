import useModalStore from "@/store/useModalStore";
import SubmitButton from "../SubMitButton";
import ModalContainer from "./modalComponents/ModalContainer";
import { deleteFolder } from "@/lib/api/folder";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";

const DeleteFolderModal = ({
  folderName,
  folderId,
}: {
  folderName: string;
  folderId: number;
}) => {
  // folderId = 741; // 테스트를 위한 하드코딩
  const { closeModal } = useModalStore();
  // let linkCount = 1; // 테스트를 위한 하드코딩
  const handleSubmit = async () => {
    // 폴더 내에 링크 개수 0 일때만 폴더 삭제 가능 -> 링크 1개 이상이면 error toast 띄우고 있음 or 전체 링크 삭제 후 폴더 삭제
    if (linkCount === 0) {
      try {
        await deleteFolder(folderId);
        toast.success(toastMessages.success.deleteFolder);
      } catch (error) {
        toast.error(toastMessages.error.deleteFolder);
      } finally {
        closeModal();
      }
    } else {
      toast.error(toastMessages.error.deleteNonEmptyFolder);
    }
  };

  return (
    <ModalContainer title="폴더 삭제" subtitle={folderName}>
      <SubmitButton
        type="button"
        onClick={handleSubmit}
        width="w-full"
        height="h-[51px]"
        color="negative"
      >
        삭제하기
      </SubmitButton>
    </ModalContainer>
  );
};
export default DeleteFolderModal;
