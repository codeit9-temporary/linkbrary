import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { parse } from "cookie";
import { LinkData } from "@/types/linkTypes";
import { FolderData } from "@/types/folderTypes";
import { Modal } from "@/components/modal/modalManager/ModalManager";
import { SearchInput } from "../../components/Search/SearchInput";
import fetchAxios from "@/lib/api/fetchAxios";
import useModalStore from "@/store/useModalStore";
import Pagination from "@/components/Pagination";
import AddLinkInput from "@/components/Link/AddLinkInput";
import Container from "@/components/Layout/Container";
import SearchResultMessage from "@/components/Search/SearchResultMessage";
import FolderTag from "@/components/Folder/FolderTag";
import FolderActionsMenu from "@/components/Folder/FolderActionsMenu";
import CardsLayout from "@/components/Layout/CardsLayout";
import LinkCard from "@/components/Link/LinkCard";
import RenderEmptyLinkMessage from "@/components/Link/RenderEmptyLinkMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import AddFolderButton from "@/components/Folder/AddFolderButton";
import useViewport from "@/hooks/useViewport";
import useFetchLinkList from "@/hooks/useFetchLinkList";
import useFetchFolderList from "@/hooks/useFetchFolderList";
import useFetchFolderName from "@/hooks/useFetchFolderName";

interface LinkPageProps {
  initialLinkList: LinkData[];
  initialFolderList: FolderData[];
  initialTotalCount: number;
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

  const [links, folders] = await Promise.all([
    fetchAxios("/links", accessToken),
    fetchAxios("/folders", accessToken),
  ]);

  return {
    props: {
      initialLinkList: links.list || [],
      initialFolderList: folders || [],
      initialTotalCount: links.totalCount || 0,
    },
  };
};

const LinkPage = ({
  initialLinkList,
  initialFolderList,
  initialTotalCount,
}: LinkPageProps) => {
  const router = useRouter();
  const { query, pathname } = router;
  const { isOpen } = useModalStore();
  const { isMobile } = useViewport();

  // useQuery가 들어간 훅을 사용하여 새로운 데이터 가져오기
  const { data: linkData, isLoading } = useFetchLinkList(query, pathname);
  const { data: folderListData } = useFetchFolderList();
  const { data: folderName } = useFetchFolderName();

  const linkCardList: LinkData[] = linkData?.list ?? initialLinkList; // 클라이언트에서 새로 요청한 데이터가 없으면 초기 데이터 사용
  const folderList: FolderData[] = folderListData ?? initialFolderList;
  const totalCount: number = linkData?.totalCount ?? initialTotalCount;

  return (
    <>
      <div className="bg-gray100 w-full h-[219px] flex justify-center items-center">
        <AddLinkInput folderList={folderList} />
      </div>
      <Container>
        <main className="mt-[40px] relative">
          <SearchInput />
          {query.search && <SearchResultMessage message={query.search} />}
          <div className="flex justify-between mt-[40px]">
            {folderList && <FolderTag folderList={folderList} />}
            {!isMobile && <AddFolderButton />}
          </div>
          <div className="flex justify-between items-center my-[24px]">
            {query.folder && (
              <>
                <h1 className="text-2xl ">{folderName}</h1>
                <FolderActionsMenu
                  folderId={query.folder}
                  linkCount={totalCount as number}
                />
              </>
            )}
          </div>
          {isLoading ? (
            <div className="min-h-[100px] h-full pt-20 pb-20">
              <LoadingSpinner />
            </div>
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
      {isMobile && <AddFolderButton isModal={true} />}
    </>
  );
};

export default LinkPage;
