import Head from "next/head";
import Image from "next/image";
import { FcGlobe, FcMenu } from "react-icons/fc";
import Navbar from "../components/Navbar";
import { GetStaticProps, NextPage } from "next";
import { TbMail } from "react-icons/tb";
import { RiWechat2Line } from "react-icons/ri";

import { getDatabase } from "../lib/notion";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const Home: NextPage<{ pages: QueryDatabaseResponse["results"] }> = ({
  pages,
}) => {
  return (
    <div className="px-2 font-Charis text-lg text-gray-700  ">
      <div className="mx-auto">
        <section className="mb-16 text-neutral-600">
          <h1 className="indexheading">Bio</h1>
          <h2 className="font-Charis">
            Hi, my name is Narra. I&apos;m insterested in web development, and
            looking for a front-end job as a graduate of 2023.
          </h2>
          <h2 className="font-Charis">
            This is my personal website, to write down what I learnt and my
            thoughts.
          </h2>
          <hr className="my-2" />
          <div className="mt-[6px] font-mono text-sm font-semibold">
            CONTACT ME: <TbMail className="inline -mr-1 text-[#ADC2A9]" />{" "}
            narrakay#163.com{" "}
            <RiWechat2Line className="inline ml-2 -mr-1 text-[#ADC2A9]" />{" "}
            csssuc
          </div>
        </section>
        <section className="mb-16">
          <h1 className="indexheading">Recent Posts</h1>

          {pages.map((post: any) => {
            return (
              <div
                key={post.id}
                className="flex flex-col  md:grid md:grid-cols-4  mb-4 md:mb-2"
              >
                <span className="text-neutral-400 col-span-1  font-DMmono text-sm self-start md:self-center min-w-[80px] ">
                  {post.properties.date.date.start.slice(2)}
                </span>
                <p className="text-neutral-600   col-span-3 ">
                  {post.properties.Name.title[0].text.content}
                </p>

                {/* <div className="hidden xl:block mr-1 text-neutral-500 col-span-2 justify-self-start text-sm self-center">
                  {post.properties.tag.multi_select.map((tag: any) => (
                    <span
                      key={tag.id}
                      className="mr-2  border-[1px] rounded-sm px-3 py-[1px] border-[#ADC2A9]"
                    >
                      <span>{tag.name}</span>
                    </span>
                  ))}
                </div> */}
              </div>
            );
          })}
        </section>

        <section className="mb-16">
          <h1 className="indexheading">Personal Project</h1>
        </section>
      </div>
    </div>
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
