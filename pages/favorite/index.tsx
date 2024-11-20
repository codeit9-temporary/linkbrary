import { useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parse } from "cookie";
import axiosInstance from "@/lib/api/axiosInstanceApi";
import CardsLayout from "@/components/Layout/CardsLayout";
import Container from "@/components/Layout/Container";
import LinkCard from "@/components/Link/LinkCard";
import Pagination from "@/components/Pagination";
import useFetchLinkList from "@/hooks/useFetchLinkList";
import LoadingSpinner from "@/components/LoadingSpinner";
import EmptyFavoriteList from "@/components/Favorite/EmptyFavoriteList";

interface FavoriteDataType {
  id: number;
  favorite: boolean;
  url: string;
  title: string;
  imageSource: string;
  description: string;
  createdAt: string;
}

interface FavoriteProps {
  totalCount: number;
  favoriteList: FavoriteDataType[];
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // 클라이언트의 쿠키 가져오기
  const { req } = context;
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  try {
    if (!accessToken) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const res = await axiosInstance.get("/favorites", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const { list, totalCount } = res.data || { list: [], totalCount: 0 };
    return { props: { favoriteList: list, totalCount } };
  } catch (error) {
    console.error("서버사이드에러", error);
    return { props: { favoriteList: [], totalCount: 0 } };
  }
};

const FavoritePage = ({
  favoriteList,
  totalCount: initialTotalCount,
}: FavoriteProps) => {
  const router = useRouter();
  const [linkCardList, setLinkCardList] =
    useState<FavoriteDataType[]>(favoriteList);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(initialTotalCount);

  useFetchLinkList(setLinkCardList, setIsLoading);

  // 마이링크 페이지로 돌아감
  const returnButton = () => {
    router.push(`/link`);
  };

  return (
    <>
      <div className="flex justify-center items-center sm:h-[117px] h-[219px] sm:mb-5 mb-10 bg-gray100 text-center">
        <h2 className="text-[32px] md:text-[40px] font-semibold">
          ⭐️ 즐겨찾기
        </h2>
      </div>
      <Container>
        <div className="flex justify-end">
          <button onClick={returnButton} className="mb-5 text-purple100">
            👈 마이링크로 돌아가기
          </button>
        </div>
        {/* 로딩 중일 때 */}
        {isLoading ? (
          <div className="min-h-[100px] h-full pt-20 pb-20">
            <LoadingSpinner />
          </div>
        ) : linkCardList.length > 0 ? (
          <>
            <CardsLayout>
              {linkCardList.length > 0
                ? linkCardList.map((favorite) => (
                    <LinkCard key={favorite.id} info={favorite} />
                  ))
                : null}
            </CardsLayout>
            <Pagination totalCount={totalCount} />
          </>
        ) : (
          <EmptyFavoriteList />
        )}
      </Container>
    </>
  );
};

export default FavoritePage;
