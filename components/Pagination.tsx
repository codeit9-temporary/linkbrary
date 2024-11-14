import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PaginationProps {
  page: number;
  pageSize: number;
  totalCount: number;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  pageSize,
  totalCount,
}) => {
  const LiStyle = "relative w-12 h-12 rounded-lg bg-gray900";
  const buttonStyle = "flex justify-center items-center h-full text-black400";

  const totalPages = Math.ceil(totalCount / pageSize);
  const [maxPagesToShow, setMaxPagesToShow] = useState(2);

  // 화면 크기 변화에 따라 pageSize와 maxPagesToShow를 설정
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setMaxPagesToShow(width > 1024 ? 5 : 3);
    };

    // 초기 설정 및 리사이즈 이벤트 리스너 추가
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 페이지 리스트 생성 함수
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= maxPagesToShow) {
      // 전체 페이지 수가 표시 가능한 페이지 수 이하인 경우 모든 페이지 표시
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // 첫 페이지와 마지막 페이지는 항상 표시
      pages.push(1);
      let start = Math.max(2, page - 1);
      let end = Math.min(totalPages - 1, page + 1);

      if (page > 3) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <ul className="flex justify-center gap-[10px] my-10">
      <li className={LiStyle}>
        <Link
          href={`/link?page=${page - 1}&pageSize=${pageSize}`}
          className={`${buttonStyle} ${page > 1 ? "text-black500" : "pointer-events-none"}`}
        >
          <Image
            src={
              page > 1
                ? "/icons/pagination-left-active.png"
                : "/icons/pagination-left.png"
            }
            height={24}
            width={24}
            alt="prev"
          />
        </Link>
      </li>

      {/* 페이지 번호와 생략 표시 */}
      {getPageNumbers().map((pageNum, index) =>
        typeof pageNum === "number" ? (
          <li key={index} className={LiStyle}>
            <Link
              href={`/link?page=${pageNum}&pageSize=${pageSize}`}
              className={`${buttonStyle} ${pageNum === page ? "text-black500" : "text-black400"}`}
            >
              {pageNum}
            </Link>
          </li>
        ) : (
          <li
            key={index}
            className={`${LiStyle} flex items-center justify-center text-black400`}
          >
            ...
          </li>
        )
      )}

      <li className={LiStyle}>
        <Link
          href={`/link?page=${page + 1}&pageSize=${pageSize}`}
          className={`${buttonStyle} ${page < totalPages ? "text-black500" : "pointer-events-none"}`}
        >
          <Image
            src={
              page < totalPages
                ? "/icons/pagination-right-active.png"
                : "/icons/pagination-right.png"
            }
            width={24}
            height={24}
            alt="next"
          />
        </Link>
      </li>
    </ul>
  );
};

export default Pagination;