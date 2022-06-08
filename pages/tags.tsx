import { GetStaticProps } from "next";
import { getDatabase } from "../lib/notion";

const Tags = ({ tags, counts }: { tags: any[]; counts: any[] }) => (
  <div>
    <h1 className="indexheading mb-10">Tags</h1>
    <div className="flex gap-4 font-Charis text-lg text-neutral-700">
      {tags.map((tag, index) => (
        <div key={tag} className="inline-block ml-2">
          <span>{tag}</span>
          <span className="text-sm ml-1 text-blue-600">{counts[index]}</span>
        </div>
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
