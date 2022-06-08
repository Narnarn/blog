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

      {pages.map((post: any) => {
        return (
          // <div key={post.id}>
          //   <span className="text-sm">{post.properties.date.date.start}</span>
          //   <p>{post.properties.Name.title[0].text.content}</p>
          // </div>
          <>
            <Link
              href={`/posts/${post.properties.slug.rich_text[0].text.content}`}
              key={post.id}
              passHref
            >
              <a className="mb-8">
                <PostList post={post} />
              </a>

              {/* <div className="mb-6 font-Charis">
                <div>
                  <span className="text-neutral-400 font-DMmono min-w-[80px] mr-4">
                    {post.properties.date.date.start.slice(2)}
                  </span>

                  <div className=" px-2 text-neutral-500  text-sm inline-block">
                    Tags:{" "}
                    {post.properties.tag.multi_select.map((tag: any) => (
                      <span key={tag.id} className="mr-2   border-[#ADC2A9]">
                        <span>{tag.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <a className="hover:cursor-pointer">
                  <div className="text-neutral-600  text-xl font-semibold ">
                    {post.properties.Name.title[0].text.content}
                  </div>
                </a>
              </div> */}
            </Link>
          </>
        );
      })}
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
