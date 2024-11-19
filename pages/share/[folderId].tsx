import { GetServerSidePropsContext } from "next";
import { LinkData } from "@/types/linkTypes";
import { getFolder } from "@/lib/api/folder";
import { getLink } from "../../lib/api/link";
import CardsLayout from "@/components/Layout/CardsLayout";
import Container from "@/components/Layout/Container";
import LinkCard from "@/components/Link/LinkCard";
import Pagination from "@/components/Pagination";

interface SharePageprops {
  folderName: string;
  linkList: LinkData[];
  totalCount: number;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { page, pageSize } = context.query;
  const { folderId } = context.params!;

  const folderListData = await getLink(
    { page: page, pageSize: pageSize },
    folderId
  );

  const folderNameData = await getFolder(folderId);

  return {
    props: {
      folderName: folderNameData.name,
      linkList: folderListData.list,
      totalCount: folderListData.totalCount,
    },
  };
};

const SharePage = ({ folderName, linkList, totalCount }: SharePageprops) => {
  return (
    <>
      <div className="flex justify-center items-center sm:h-[117px] h-[219px] sm:mb-5 mb-10 bg-gray100 text-center">
        <h2 className="text-[32px] md:text-[40px] font-semibold">
          {folderName}
        </h2>
      </div>
      <Container>
        {linkList.length > 0 && (
          <>
            <CardsLayout>
              {linkList.length > 0
                ? linkList.map((link) => <LinkCard key={link.id} info={link} />)
                : null}
            </CardsLayout>
            <Pagination totalCount={totalCount} />
          </>
        )}
      </Container>
    </>
  );
};

export default SharePage;
