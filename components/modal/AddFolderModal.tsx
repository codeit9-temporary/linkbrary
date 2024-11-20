import { ChangeEvent, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { postFolders } from "@/lib/api/folder";
import ModalContainer from "./modalComponents/ModalContainer";
import ModalInput from "./modalComponents/ModalInput";
import useModalStore from "@/store/useModalStore";
import SubmitButton from "../SubMitButton";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";

const AddFolderModal = ({ folderName }: { folderName: string }) => {
  const [value, setValue] = useState("");
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length > 5) {
      toast.error(toastMessages.error.limitFolderNameLength);
    } else {
      setValue(newValue);
    }
  };
  const handleSubmit = async () => {
    const body = {
      name: value,
    };
    if (value !== "") {
      try {
        await postFolders(body);
        queryClient.invalidateQueries({ queryKey: ["folderList"] });
        toast.success(toastMessages.success.addFolder);
      } catch (error) {
        toast.error(toastMessages.error.addFolder);
      }
    }
    closeModal();
  };
  return (
    <ModalContainer title="폴더 추가">
      <ModalInput
        placeholder="이름을 입력해주세요"
        name={folderName}
        value={value}
        onChange={handleChange}
      />
      <SubmitButton
        type="button"
        onClick={handleSubmit}
        width="w-full"
        height="h-[51px]"
        color="positive"
      >
        추가하기
      </SubmitButton>
    </ModalContainer>
  );
};

export default AddFolderModal;
