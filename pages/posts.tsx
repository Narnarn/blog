import Head from "next/head";
import { GetStaticProps, NextPage } from "next";

import { getDatabase } from "../lib/notion";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import Post from "../components/Post";

const Posts: NextPage<{ pages: QueryDatabaseResponse["results"] }> = ({
  pages,
}) => {
  return (
    <>
      <Head>
        <title>uazn Blog - NarraKay</title>
      </Head>

      <h1 className="indexheading mb-10">Posts</h1>

      {pages.map((post: any) => {
        return (
          // <div key={post.id}>
          //   <span className="text-sm">{post.properties.date.date.start}</span>
          //   <p>{post.properties.Name.title[0].text.content}</p>
          // </div>
          <div key={post.id} className="mb-10 font-Charis">
            <Post post={post} />
          </div>
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
