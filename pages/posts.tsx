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
          <div key={post.id}>
            <span className="text-sm">{post.properties.date.date.start}</span>
            <p>{post.properties.Name.title[0].text.content}</p>
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
