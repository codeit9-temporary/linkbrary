import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

const useRerenderFolderList = (isOpen: boolean) => {
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
};

export default useRerenderFolderList;
