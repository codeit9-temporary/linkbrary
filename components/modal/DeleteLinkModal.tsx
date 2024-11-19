import { useQueryClient } from "@tanstack/react-query";
import { useLinkCardStore } from "@/store/useLinkCardStore";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import useModalStore from "@/store/useModalStore";
import ModalContainer from "./modalComponents/ModalContainer";
import SubmitButton from "../SubMitButton";

const DeleteLinkModal = ({
  link,
  linkId,
}: {
  link: string;
  linkId: number;
}) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();
  const { deleteLink } = useLinkCardStore();

  const handleDelete = async () => {
    try {
      await deleteLink(linkId);
      queryClient.invalidateQueries({ queryKey: ["linkList"] });
      closeModal();
      toast.success(toastMessages.success.deleteLink);
    } catch (error) {
      toast.error(toastMessages.error.deleteLink);
    }
  };

  return (
    <ModalContainer title="링크 삭제" subtitle={link}>
      <SubmitButton
        type="button"
        onClick={handleDelete}
        width="w-full"
        height="h-[51px]"
        color="negative"
      >
        삭제하기
      </SubmitButton>
    </ModalContainer>
  );
};
export default DeleteLinkModal;
