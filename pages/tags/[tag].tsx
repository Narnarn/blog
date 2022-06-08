import { queryDatabaseByTag, getDatabase } from "../../lib/notion";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Post from "../../components/Post";

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
              passHref
            >
              <a className="mb-8">
                <Post post={post} />
              </a>
            </Link>
          </>
        );
      })}
    </>
  );
};

export default TagResults;
