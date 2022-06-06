const Text = ({ text }: { text: any }) => {
  if (!text) return null;
  return text.map((value: any) => {
    const {
      annotations: { bold, italic, strikethrough, underline, code, color },
      text,
      href,
    } = value;
    return (
      <span
        key={href}
        className={`
      ${bold && "font-bold"} ${
          code &&
          "rounded  px-2 font-mono bg-lime-50/60 text-sm text-green-800 font-semibold"
        }
      ${italic && "italic"} ${strikethrough && "line-through"} ${
          underline && "underline"
        } leading-loose
      `}
        style={color !== "default" ? { color } : {}}
      >
        {text.link ? (
          <a href={text.link.url} target="_blank" rel="noreferrer">
            {text.content}
          </a>
        ) : (
          text.content
        )}
      </span>
    );
  });
};
export default Text;
