// tailwind 동적 스타일을 위한 함수
export const bindCls = (...cls: string[]) => {
  return cls.join(" ");
};

// 데이터나 API에서 이미지 URL이 //로 오는 경우 자동으로 프로토콜 추가
export const ensureAbsoluteUrl = (url: string) => {
  return url.startsWith("//") ? `https:${url}` : url;
};
