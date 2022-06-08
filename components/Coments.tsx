import Giscus from "@giscus/react";

const Comments = () => {
  return (
    <div className="mt-10">
      <Giscus
        id="comments"
        repo="Narnarn/blog"
        repoId="R_kgDOHd2gzg"
        category="Announcements"
        category-id="DIC_kwDOHd2gzs4CPh80"
        mapping="pathname"
        reactions-enabled="1"
        emit-metadata="0"
        input-position="bottom"
        theme="dark_dimmed"
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
};

export default Comments;
