import Head from "next/head";
import { GetStaticProps, NextPage } from "next";

import { getDatabase } from "../lib/notion";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const Blog: NextPage<{ posts: QueryDatabaseResponse["results"] }> = ({
  posts,
}) => {
  return (
    <>
      <Head>
        <title>uazn Blog - NarraKay</title>
      </Head>

      <h1 className="heading-text">Posts List</h1>

      {posts.map((post: any) => {
        return (
          <p key={post.id}>{post.properties.Name.title[0].text.content}</p>
        );
      })}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const pages = await getDatabase();

  return {
    props: { posts: pages },
  };
};

export default Blog;
