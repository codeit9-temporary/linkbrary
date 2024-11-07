import ModalContainer from "./modalComponents/ModalContainer";
import ModalShare from "./modalComponents/ModalShare";

const ShareModal = ({ folderName }: { folderName: string }) => {
  return (
    <ModalContainer title="폴더 공유" subtitle={folderName}>
      <ModalShare />
    </ModalContainer>
  );
};
export default ShareModal;
