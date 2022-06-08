import { queryDatabaseByTag, getDatabase } from "../../lib/notion";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

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
      <h1 className="indexheading mb-10 font-semibold">
        Posts tagged - {`"${tag}"`}
      </h1>

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
              className="mb-10 "
            >
              <div className="mb-6 font-Charis">
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
              </div>
            </Link>
          </>
        );
      })}
    </>
  );
};

export default TagResults;
