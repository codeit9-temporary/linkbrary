import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

const breakpoints = {
  PC: { min: 1200 },
  Tablet: { min: 768, max: 1199 },
  Mobile: { min: 343, max: 767 },
};

// 현재 브라우저의 innerWidth와 반응형 상태를 반환하는 훅
function useViewport(initialWidth = 0) {
  const [width, setWidth] = useState(initialWidth);

  // debounce를 사용하여 resize 이벤트 핸들러 생성
  const handleResize = debounce(() => {
    setWidth(window.innerWidth);
  }, 200); // 200ms 지연

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거 및 디바운스 정리
      window.removeEventListener("resize", handleResize);
      handleResize.cancel(); // debounce 취소
    };
  }, [handleResize]);

  const isPC = width >= breakpoints.PC.min;
  const isTablet =
    width >= breakpoints.Tablet.min && width <= breakpoints.Tablet.max;
  const isMobile =
    width >= breakpoints.Mobile.min && width <= breakpoints.Mobile.max;

  return { width, isPC, isTablet, isMobile };
}

export default useViewport;
