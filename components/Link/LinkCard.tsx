import { MouseEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useLinkCardStore } from "@/store/useLinkCardStore";
import { ensureAbsoluteUrl } from "@/util/ensureAbsoluteUrl";
import timeAgo from "@/util/timeAgo";
import Image from "next/image";
import Dropdown from "../Dropdown";
import useModalStore from "@/store/useModalStore";
import useOutsideClick from "@/hooks/useOutsideClick";

interface LinkCardProps {
  info: {
    id: number;
    title: string;
    description: string;
    favorite?: boolean;
    imageSource: string;
    url: string;
    createdAt: string;
  };
}

const LinkCard = ({ info }: LinkCardProps) => {
  const [isSubscribed, setIsSubscribed] = useState(info.favorite || false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isOpen, openModal } = useModalStore();

  const { updateFavorite } = useLinkCardStore();

  const formattedDate = info.createdAt?.slice(0, 10).replace(/-/g, ".");
  const createdTime = timeAgo(info.createdAt);

  const router = useRouter();
  const onlyLinkPage = router.pathname === "/link";
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 모달이 열릴 때 드롭다운 닫기
  useEffect(() => {
    if (isOpen) setIsDropdownOpen(false);
  }, [isOpen]);

  useOutsideClick(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  // 즐겨찾기 버튼 클릭 시 호출되는 함수
  const handleFavoriteToggle = async (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsSubscribed((prev) => !prev);
    try {
      updateFavorite(info.id, !isSubscribed);
    } catch (error) {
      console.error("즐겨찾기 설정 중 오류 발생:", error);
    }
  };

  // dropdown 버튼
  const toggleDropdown = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  const handleModalOpen = (
    type: "EditLink" | "DeleteLinkModal",
    link: string,
    linkId: number
  ) => {
    openModal(type, { link, linkId });
  };

  const handleNavigate = (url: string) => {
    if (!isDropdownOpen)
      window.location.href =
        url.slice(0, 4) === "http" ? url : `https://${url}`;
  };

  const dropdownItems = [
    {
      label: "수정하기",
      onClick: () => handleModalOpen("EditLink", info.url, info.id),
    },
    {
      label: "삭제하기",
      onClick: () => handleModalOpen("DeleteLinkModal", info.url, info.id),
    },
  ];

  return (
    <div
      className="w-[340px] h-[344px] rounded-[12px] shadow-lg overflow-hidden cursor-pointer hover:scale-105 hover:duration-300"
      onClick={() => handleNavigate(info.url)}
    >
      <section className="relative w-full h-[60%]">
        <Image
          src={ensureAbsoluteUrl(info.imageSource) || `/images/no-content.svg`}
          className="object-cover"
          alt="링크 미리보기"
          fill
        />
        {/* 즐겨찾기 페이지가 아닐 때에는 즐겨찾기 버튼 렌더링x */}
        {onlyLinkPage && (
          <div
            onClick={handleFavoriteToggle}
            className="absolute top-[15px] right-[15px] z-1"
          >
            <Image
              src={
                isSubscribed ? "/icons/star-fill.svg" : "/icons/star-empty.svg"
              }
              width={32}
              height={32}
              alt="subscribe button"
            />
          </div>
        )}
      </section>

      <section className="w-full h-[40%] flex flex-col justify-between gap-[10px] pt-[15px] px-[20px] pb-[10px]">
        <div className="flex justify-between">
          <span className="text-sm text-gray-400">
            {createdTime || "1일 전"}
          </span>
          {/* isFavoritePage일 때만 케밥 버튼 렌더링 */}
          {onlyLinkPage && (
            <div className="relative" ref={dropdownRef}>
              <button
                className="relative w-[21px] h-[17px]"
                onClick={toggleDropdown}
              >
                <Image src="/icons/kebab.svg" alt="kebab button" fill />
              </button>
              {isDropdownOpen && <Dropdown items={dropdownItems} />}
            </div>
          )}
        </div>
        <div
          className="text-black100 y-[42px] line-clamp-2"
          onClick={() => handleNavigate(info.url)}
        >
          {info.description || "설명"}
        </div>
        <div className="text-sm">{formattedDate || "2024.11.06"}</div>
      </section>
    </div>
  );
};

export default LinkCard;
