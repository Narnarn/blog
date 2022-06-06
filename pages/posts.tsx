import Head from "next/head";
import { GetStaticProps, NextPage } from "next";

import { getDatabase } from "../lib/notion";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const Posts: NextPage<{ pages: QueryDatabaseResponse["results"] }> = ({
  pages,
}) => {
  return (
    <>
      <Head>
        <title>uazn Blog - NarraKay</title>
      </Head>

      <h1 className="heading-text">Posts List</h1>

      {pages.map((post: any) => {
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
    props: { pages: pages },
    revalidate: 3600,
  };
};

export default Posts;
