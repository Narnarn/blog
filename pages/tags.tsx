import { GetStaticProps } from "next";
import Link from "next/link";
import { getDatabase } from "../lib/notion";

const Tags = ({ tags, counts }: { tags: any[]; counts: any[] }) => (
  <div>
    <h1 className="indexheading mb-10">Tags</h1>
    <div className="flex gap-4 font-Charis text-lg text-neutral-700 flex-wrap">
      {tags.map((tag, index) => (
        <Link key={tag} href={`tags/${tag}`} passHref>
          <a className="hover:text-neutral-400">
            <div className="inline-block ml-2">
              <span>{tag}</span>
              <span className="text-sm ml-1 text-green-800">
                {counts[index]}
              </span>
            </div>
          </a>
        </Link>
      ))}
    </div>
  </div>
);

export const getStaticProps: GetStaticProps = async () => {
  const pages = await getDatabase();
  let tagsMap = new Map();
  pages.forEach((post: any) => {
    post.properties.tag.multi_select.map((tag: any) => {
      tagsMap.set(
        tag.name,
        tagsMap.get(tag.name) ? tagsMap.get(tag.name) + 1 : 1
      );
    });
  });

  return {
    props: {
      tags: Array.from(tagsMap.keys()),
      counts: Array.from(tagsMap.values()),
    },
    revalidate: 3600,
  };
};

export default Tags;
