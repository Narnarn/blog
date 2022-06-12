import Head from "next/head";
import Image from "next/image";
import { FcGlobe, FcMenu } from "react-icons/fc";
import Navbar from "../components/Navbar";
import { GetStaticProps, NextPage } from "next";
import { TbMail } from "react-icons/tb";
import { RiWechat2Line } from "react-icons/ri";

import { getDatabase } from "../lib/notion";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";

const Home: NextPage<{ pages: QueryDatabaseResponse["results"] }> = ({
  pages,
}) => {
  return (
    <>
      <Head>
        <title>Narra&apos;s Blog</title>
      </Head>

      <div className="font-Charis text-lg text-gray-700 dark:text-gray-100/80 ">
        <section className="mb-8 text-neutral-600 dark:text-gray-100/80">
          <h1 className="indexheading">About</h1>
          <div className="mt-12">
            <div>Hi, 这里是 Narra. </div>
            <div>目前是菜鸟一只. 目标是能写优雅的代码，独立做有趣的东西，</div>
            <div>在喜欢的地方过想过的生活. </div>

            <p> </p>
          </div>
        </section>
        <div>
          <img
            src="/pattern.webp"
            alt="pattern fugtiptil"
            width={540}
            height={675}
          />
        </div>
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

export default Home;
