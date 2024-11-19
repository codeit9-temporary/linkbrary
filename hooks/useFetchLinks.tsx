import { useQuery } from "@tanstack/react-query";
import { proxy } from "@/lib/api/axiosInstanceApi";
import { ParsedUrlQuery } from "querystring";
import useViewport from "./useViewport";

const fetchLinks = async (
  query: ParsedUrlQuery,
  pathname: string,
  isTablet: boolean
) => {
  // 경로에 따라 API 엔드포인트 분기
  let endpoint =
    pathname === "/favorite"
      ? "/api/favorites"
      : query?.folder
        ? `/api/folders/${query.folder}/links`
        : "/api/links";

  const res = await proxy.get(endpoint, {
    params: {
      page: query?.page,
      pageSize: isTablet ? 6 : 10,
      search: query?.search,
    },
  });

  if (!res) return { link: [], totalCount: 0 }; // res를 못 받아올 때 예외처리를 확실하게 해줘야 함.
  return res.data;
};

const useFetchLinks = (query: ParsedUrlQuery = {}, pathname: string) => {
  const { isTablet } = useViewport();
  return useQuery({
    queryKey: [
      "linkList",
      pathname,
      query.folder,
      query.page,
      query.search,
      isTablet,
    ], // query, pathname, isTablet이 바뀔 때마다 stale이 됨.
    queryFn: () => fetchLinks(query, pathname, isTablet),
    staleTime: 3 * 1000 * 60, // 3분 동안 신선하게 유지됨.
  });
};

export default useFetchLinks;
