import Head from "next/head";
import { GetStaticProps, NextPage } from "next";

import { getDatabase } from "../lib/notion";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

import Link from "next/link";
import PostList from "../components/PostList";

const Posts: NextPage<{ pages: QueryDatabaseResponse["results"] }> = ({
  pages,
}) => {
  return (
    <>
      <Head>
        <title>Posts -- Narra&apos;s Blog</title>
      </Head>

      <h1 className="indexheading mb-10">Posts</h1>
      <div className="flex flex-col gap-2">
        {pages.map((post: any) => {
          return (
            <>
              <div className=" font-Charis text-lg">
                <div className="mb-2">
                  <span className="text-neutral-400 dark:text-gray-100/80 font-DMmono min-w-[80px] mr-4 text-base">
                    {post.properties.date.date.start.slice(2)}
                  </span>

                  <div className=" px-2 text-neutral-500 dark:text-gray-100/80 hover:text-neutral-400 dark:hover:text-white text-sm inline-block">
                    Tags:{" "}
                    {post.properties.tag.multi_select.map((tag: any) => (
                      <span key={tag.id} className="mr-2">
                        <Link href={`/tags/${tag.name}`} passHref>
                          <a>{tag.name}</a>
                        </Link>
                      </span>
                    ))}
                  </div>
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
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const pages = await getDatabase();

  return {
    props: { pages: pages },
    revalidate: 3600,
  };
};

export default Posts;
