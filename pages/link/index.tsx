import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { parse } from "cookie";
import { LinkData } from "@/types/linkTypes";
import { FolderData } from "@/types/folderTypes";
import { Modal } from "@/components/modal/modalManager/ModalManager";
import { SearchInput } from "../../components/Search/SearchInput";
import axiosInstance from "@/lib/api/axiosInstanceApi";
import useModalStore from "@/store/useModalStore";
import Pagination from "@/components/Pagination";
import AddLinkInput from "@/components/Link/AddLinkInput";
import Container from "@/components/Layout/Container";
import SearchResultMessage from "@/components/Search/SearchResultMessage";
import FolderTag from "@/components/Folder/FolderTag";
import AddFolderButton from "@/components/Folder/AddFolderButton";
import FolderActionsMenu from "@/components/Folder/FolderActionsMenu";
import CardsLayout from "@/components/Layout/CardsLayout";
import LinkCard from "@/components/Link/LinkCard";
import RenderEmptyLinkMessage from "@/components/Link/RenderEmptyLinkMessage";
import useFetchLinks from "@/hooks/useFetchLinks";
import useViewport from "@/hooks/useViewport";
import { useLinkCardStore } from "@/store/useLinkCardStore";
import LoadingSpinner from "@/components/LoadingSpinner";

interface LinkPageProps {
  linkList: LinkData[];
  folderList: FolderData[];
  totalCount: number;
}

// /link 페이지 접속시에 초기렌더링 데이터(전체 폴더, 전체링크리스트)만 fetch해서 client로 전달.
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context;
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  // accessToken이 없으면 클라이언트에서 실행될 때 /login 페이지로 이동시킴.
  if (!accessToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const fetchData = async (endpoint: string) => {
    const res = await axiosInstance.get(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  };

  const [links, folders] = await Promise.all([
    fetchData("/links"),
    fetchData("/folders"),
  ]);

  return {
    props: {
      linkList: links.list || [],
      folderList: folders || [],
      totalCount: links.totalCount || 0,
    },
  };
};

const LinkPage = ({
  linkList: initialLinkList,
  folderList: initialFolderList,
  totalCount: initialTotalCount,
}: LinkPageProps) => {
  const router = useRouter();
  const { search, folder } = router.query;
  const { isOpen } = useModalStore();
  const { isMobile } = useViewport();
  const [isLoading, setIsLoading] = useState(false);
  const [folderList, setFolderList] = useState(initialFolderList);
  const { totalCount, linkCardList, setLinkCardList } =
    useLinkCardStore.getState();

  // 링크리스트 초기값 설정
  setLinkCardList(initialLinkList, initialTotalCount);

  // 링크페이지의 query가 바뀌면 새로운 리스트로 업데이트 해주는 훅
  useFetchLinks(setLinkCardList, setIsLoading, router.query, router.pathname);

  console.log(linkCardList);

  return (
    <>
      <div className="bg-gray100 w-full h-[219px] flex justify-center items-center">
        <AddLinkInput folderList={folderList} />
      </div>
      <Container>
        <main className="mt-[40px] relative">
          <SearchInput />
          {search && <SearchResultMessage message={search} />}
          <div className="flex justify-between mt-[40px]">
            {folderList && <FolderTag folderList={folderList} />}
            {!isMobile && <AddFolderButton setFolderList={setFolderList} />}
          </div>
          <div className="flex justify-between items-center my-[24px]">
            <h1 className="text-2xl ">유용한 글</h1>
            {folder && (
              <FolderActionsMenu
                setFolderList={setFolderList}
                folderId={folder}
                linkCount={totalCount as number}
              />
            )}
          </div>
          {isLoading ? (
            <LoadingSpinner /> // 로딩 상태일 때 로딩 스피너 표시
          ) : linkCardList.length !== 0 ? (
            <>
              <CardsLayout>
                {linkCardList.map((link) => (
                  <LinkCard key={link.id} info={link} />
                ))}
              </CardsLayout>
              <Pagination totalCount={totalCount as number} />
            </>
          ) : (
            <RenderEmptyLinkMessage />
          )}
        </main>
      </Container>
      {isOpen && <Modal />}
      {isMobile && (
        <AddFolderButton setFolderList={setFolderList} isModal={true} />
      )}
    </>
  );
};

export default LinkPage;
