const Post = (props: { post: any }) => {
  return (
    <div className="font-Charis">
      <div>
        <span className="text-neutral-400 font-DMmono min-w-[80px] mr-4">
          {props.post.properties.date.date.start.slice(2)}
        </span>

        <div className=" px-2 text-neutral-500  text-sm inline-block">
          Tags:{" "}
          {props.post.properties.tag.multi_select.map((tag: any) => (
            <span key={tag.id} className="mr-2   border-[#ADC2A9]">
              <span>{tag.name}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="text-neutral-600  text-xl font-semibold ">
        {props.post.properties.Name.title[0].text.content}
      </div>
    </div>
  );
};

export default Post;
