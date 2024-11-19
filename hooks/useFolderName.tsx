import { useRouter } from "next/router";
import { getFolder } from "@/lib/api/folder";
import { useQuery } from "@tanstack/react-query";

const useFolderName = () => {
  const router = useRouter();
  const { folder: folderId } = router.query;

  const getFolderName = async () => {
    const res = await getFolder(folderId);
    if (!res || !res.data) {
    }
    return res.name;
  };

  return useQuery({
    queryKey: ["folderName", folderId],
    queryFn: () => getFolderName(),
    enabled: !!folderId,
  });
};
export default useFolderName;
