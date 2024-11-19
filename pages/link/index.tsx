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
import FolderActionsMenu from "@/components/Folder/FolderActionsMenu";
import CardsLayout from "@/components/Layout/CardsLayout";
import LinkCard from "@/components/Link/LinkCard";
import RenderEmptyLinkMessage from "@/components/Link/RenderEmptyLinkMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import AddFolderButton from "@/components/Folder/AddFolderButton";
import useFetchLinks from "@/hooks/useFetchLinks";
import useViewport from "@/hooks/useViewport";
import useGetFolderList from "@/hooks/useGetFolderList";
import useFolderName from "@/hooks/useFolderName";

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
      initialLinkList: links.list || [],
      folderList: folders || [],
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
  const { search, folder } = router.query;
  const { isOpen } = useModalStore();
  const { isMobile } = useViewport();

  // useQuery가 들어간 훅을 사용하여 새로운 데이터 가져오기
  const { data: linkData, isLoading } = useFetchLinks(
    router.query,
    router.pathname
  );
  const { data: folderListData } = useGetFolderList();
  const { data: folderName } = useFolderName(folder);

  const linkCardList: LinkData[] = linkData?.list || initialLinkList; // 클라이언트에서 가져온 데이터가 없으면 초기 데이터 사용
  const folderList: FolderData[] = folderListData?.list || initialFolderList;
  const totalCount: number = linkData?.totalCount || initialTotalCount;

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
            {!isMobile && <AddFolderButton />}
          </div>
          <div className="flex justify-between items-center my-[24px]">
            {folder && (
              <>
                <h1 className="text-2xl ">{folderName as string}</h1>
                <FolderActionsMenu
                  folderId={folder}
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
