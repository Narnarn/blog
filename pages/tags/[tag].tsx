import { queryDatabaseByTag, getDatabase } from "../../lib/notion";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import PostList from "../../components/PostList";
import Head from "next/head";

export const getStaticPaths = async () => {
  const pages = await getDatabase();
  let tags: string[] = [];
  pages.forEach((post: any) => {
    tags.push(...post.properties.tag.multi_select.map((tag: any) => tag.name));
  });
  let paths = tags.map((tag) => ({
    params: {
      tag: tag,
    },
  }));
  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const { tag } = params;
  const pages = await queryDatabaseByTag(tag);
  console.log(tag);

  return {
    props: {
      pages,
      tag,
    },
    revalidate: 60 * 60,
  };
};

const TagResults: NextPage<{
  pages: QueryDatabaseResponse["results"];
  tag: string;
}> = ({ pages, tag }) => {
  return (
    <>
      <Head>
        <title>Tag: {tag}</title>
      </Head>
      <h1 className="indexheading mb-12">Posts tagged - {`"${tag}"`}</h1>

      {pages.map((post: any) => {
        return (
          <>
            <div className=" font-Charis text-lg">
              <div className="mb-2">
                <span className="text-neutral-400 dark:text-gray-100/80 font-DMmono min-w-[80px] mr-4 text-base">
                  {post.properties.date.date.start.slice(2)}
                </span>
              </div>
              <Link
                href={`/posts/${post.properties.slug.rich_text[0].text.content}`}
                key={post.id}
                passHref
              >
                <a className="text-neutral-600  dark:text-neutral-100 text-xl font-semibold hover:text-neutral-400 dark:hover:text-neutral-100/60">
                  {post.properties.Name.title[0].text.content}
                </a>
              </Link>
              <div className="mt-8 mb-4 h-[1px] w-full border-t-[1px] border-t-green-800 dark:border-t-green-50 border-dashed"></div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default TagResults;
