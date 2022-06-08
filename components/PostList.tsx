const PostList = (props: { post: any }) => {
  return (
    <div className="font-Charis dark:text-neutral-100/90">
      <div>
        <span className="text-neutral-400 dark:text-gray-100/80 font-DMmono min-w-[80px] mr-4">
          {props.post.properties.date.date.start.slice(2)}
        </span>

        <div className=" px-2 text-neutral-500  dark:text-gray-100/80 text-sm inline-block">
          Tags:{" "}
          {props.post.properties.tag.multi_select.map((tag: any) => (
            <span key={tag.id} className="mr-2   border-[#ADC2A9]">
              <span>{tag.name}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="text-neutral-600 dark:text-neutral-100/90 text-xl font-semibold hover:text-neutral-400 dark:hover:text-white">
        {props.post.properties.Name.title[0].text.content}
      </div>
    </div>
  );
};

export default PostList;
