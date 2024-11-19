import { useRouter } from "next/router";
import { getFolder } from "@/lib/api/folder";
import { useQuery } from "@tanstack/react-query";

const useFetchFolderName = () => {
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
    staleTime: 3 * 1000 * 60, // 3분 동안 신선하게 유지됨.
  });
};
export default useFetchFolderName;
