import { ChangeEvent, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { urlRegex } from "@/util/regex";
import { putLinkURL } from "@/lib/api/link";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import useModalStore from "@/store/useModalStore";
import ModalInput from "./modalComponents/ModalInput";
import ModalContainer from "./modalComponents/ModalContainer";
import SubmitButton from "../SubMitButton";

const EditLink = ({
  folderName,
  link,
  linkId,
}: {
  folderName: string;
  link: string;
  linkId: number;
}) => {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const { closeModal } = useModalStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = async () => {
    const body = {
      url: value,
    };
    if (value === link) {
      toast.error(toastMessages.error.sameLink);
    } else if (value === "") {
      toast.error(toastMessages.error.inputLink);
    } else if (!urlRegex.test(value)) {
      toast.error(toastMessages.error.invalidLink);
    } else {
      try {
        await putLinkURL(linkId, { url: value });
        queryClient.invalidateQueries({ queryKey: ["linkList"] }); // linkList stale로 만듦으로써 refetch 되도록 해줌.
        closeModal();
        toast.success(toastMessages.success.editLink);
      } catch (err) {
        toast.error(toastMessages.error.editLink);
      }
    }
  };
  return (
    <ModalContainer title="링크 주소 변경">
      <ModalInput
        placeholder={link}
        name={folderName}
        value={value}
        onChange={handleChange}
      />
      <SubmitButton
        type="button"
        onClick={handleSubmit}
        width="w-full"
        height="h-[51px] "
        color="positive"
      >
        변경하기
      </SubmitButton>
    </ModalContainer>
  );
};
export default EditLink;
