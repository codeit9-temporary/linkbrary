import { useQuery } from "@tanstack/react-query";
import { getFolders } from "@/lib/api/folder";

const getFolderList = async () => {
  const res = await getFolders();
  if (!res) {
    return [];
  }
  return res;
};

const useFetchFolderList = () => {
  return useQuery({
    queryKey: ["folderList"],
    queryFn: getFolderList,
    staleTime: 3 * 1000 * 60, // 3분 동안 신선하게 유지됨.
  });
};

export default useFetchFolderList;
