import axiosInstance, { proxy } from "./axiosInstanceApi";

interface postLinkProps {
  url: string;
  folderId: number;
}

interface putLinkURLProps {
  url: string;
}

interface putLinkFavoriteProps {
  favorite: boolean;
}

// 폴더에 속한 링크 조회
export const getLink = async (
  query: any,
  forderId: string | string[] | undefined
) => {
  try {
    const res = await axiosInstance.get(`/folders/${forderId}/links`, {
      params: {
        page: query.page || 1,
        pageSize: query.pageSize || 10,
      },
    });

    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};

// 링크 생성(auth)
export const postLink = async (body: postLinkProps) => {
  try {
    const res = await proxy.post("/api/links", body);
    if (res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      throw new Error("Request failed");
    }
  } catch (err) {
    // console.error("에러 메시지: ", err instanceof Error ? err.message : err);
    throw err;
  }
};

// 유저의 전체 링크 조회(auth)
export const getLinks = async () => {
  try {
    const res = await proxy.get("/api/links");
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};

// 유저의 즐겨찾기 링크 조회(auth)
export const getFavorites = async () => {
  try {
    const res = await proxy.get("/api/favorites");
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};

// 링크 URL 수정(auth)
export const putLinkURL = async (linkId: number, body: putLinkURLProps) => {
  try {
    const res = await proxy.put(`/api/links/${linkId}`, body);
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
    throw err;
  }
};

// 링크 삭제(auth)
export const deleteLinkURL = async (linkId: number) => {
  try {
    const res = await proxy.delete(`/api/links/${linkId}`);
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
    throw err;
  }
};

// 링크의 즐겨찾기 설정(auth)
export const putLinkFavorite = async (
  linkId: number,
  body: putLinkFavoriteProps
) => {
  try {
    const res = await proxy.put(`/api/links/${linkId}/favorite`, body);
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};
