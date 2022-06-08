import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import NotionBlock from "../../components/NotionBlock";
import { getBlocks, getDatabase, getPageProps } from "../../lib/notion";
import probeImageSize from "../../lib/probeImageSize";

export const getStaticPaths = async () => {
  const db = await getDatabase();
  return {
    paths: db.map((page: any) => ({
      params: { slug: page.properties.slug.rich_text[0].text.content },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const { slug } = params;
  const db = await getDatabase(slug);
  const pageId = db[0].id;
  const page = await getPageProps(pageId);
  const blocks = await getBlocks(pageId);
  const childBlocks = await Promise.all(
    blocks
      .filter((block: any) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const addChildToBlock = blocks.map((b: any) => {
    if (b.has_children && !b[b.type].children) {
      b[b.type]["children"] = childBlocks.find((x) => x.id === b.id)?.children;
    }
    return b;
  });
  await Promise.all(
    addChildToBlock
      .filter((b: any) => b.type === "image")
      .map(async (b) => {
        const { type } = b;
        const value = b[type];
        const src =
          value.type === "external" ? value.external.url : value.file.url;

        const { width, height } = await probeImageSize(src);
        value["dim"] = { width, height };
        b[type] = value;
      })
  );
  return {
    props: {
      page,
      blocks: addChildToBlock,
    },
    revalidate: 60 * 60,
  };
};

const PostPage: NextPage<{ page: any; blocks: any[] }> = ({ page, blocks }) => {
  const router = useRouter();
  if (!page || !blocks) return <div></div>;
  return (
    <>
      <Head>
        <title>{page.properties.Name.title[0].plain_text} - space</title>
      </Head>
      <div className="text-neutral-700 font-WorkSans">
        {blocks.map((block) => (
          <NotionBlock key={block.id} block={block} />
        ))}
      </div>
    </>
  );
};
export default PostPage;
