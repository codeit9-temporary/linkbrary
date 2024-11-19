import { useQuery } from "@tanstack/react-query";
import { getFolders } from "@/lib/api/folder";

const getFolderList = async () => {
  const res = await getFolders();
  if (!res) {
    throw new Error("폴더 데이터를 가져오는 데 실패했습니다."); // 에러 처리
  }
  return res;
};

const useGetFolderList = () => {
  return useQuery({
    queryKey: ["folderList"],
    queryFn: getFolderList,
  });
};

export default useGetFolderList;
