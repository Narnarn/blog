import Text from "./NotionTextBlock";
import slugify from "slugify";
import { Fragment } from "react";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Latex from "react-latex-next";

const NotionBlock = ({ block }: { block: any }) => {
  const { type, id } = block;
  const value = block[type];

  try {
    switch (type) {
      case "paragraph":
        return (
          <p className="mb-1">
            <Text text={value.rich_text} />
          </p>
        );

      case "heading_1":
        return (
          <h1
            id="slugify(value.rich_text[0].text.content)"
            className="font-Montserrat text-4xl mt-12 mb-2 font-semibold"
          >
            {" "}
            {value.rich_text[0].plain_text}
          </h1>
        );

      case "heading_2":
        return (
          <h2
            id="slugify(value.rich_text[0].text.content)"
            className="font-Montserrat text-2xl mt-8 mb-2 font-medium"
          >
            {value.rich_text[0].plain_text}
          </h2>
        );

      case "heading_3":
        return (
          <h3
            id="slugify(value.rich_text[0].text.content)"
            className="font-Montserrat text-xl mt-8 mb-2 font-medium"
          >
            {value.rich_text[0].plain_text}
          </h3>
        );
      case "callout":
        return (
          <div className="rounded border-l-2 bg-green-50/30 p-4 my-2 shadow-sm">
            <span className="mr-4">{value.icon?.emoji || "🌟"}</span>
            <Text text={value.rich_text} />
          </div>
        );

      case "quote":
        return (
          <p className=" border-l-2 border-green-800/60 bg-green-50/30 p-2 my-2  shadow-sm ">
            <Text text={value.rich_text} />
          </p>
        );

      case "bulleted_list_item":
        return (
          <ul>
            <li className="list-square list-inside pl-4">
              <Text text={value.rich_text} />
            </li>
          </ul>
        );
      case "numbered_list_item":
        return (
          <ol className="list-disc list-inside pl-4">
            <li>
              <Text text={value.rich_text} />
            </li>
          </ol>
        );
      case "to_do":
        return (
          <div>
            <label htmlFor={id}>
              <input
                type="checkbox"
                id={id}
                checked={value.checked}
                className="mr-2"
              />
              <Text text={value.rich_text} />
            </label>
          </div>
        );
      case "toggle":
        return (
          <details>
            <summary>
              <Text text={value.rich_text} />
            </summary>
            {value.children?.map((block: any) => (
              <Fragment key={block.id}>{NotionBlock(block)}</Fragment>
            ))}
          </details>
        );
      case "child_page":
        return <p>{value.title}</p>;
      case "divider":
        return <hr />;
      // case "code":
      //   return (
      //     <SyntaxHighlighter language={value.language} style={tomorrow}>
      //       {value.rich_text[0].plain_text}
      //     </SyntaxHighlighter>
      //   );
      case "equation":
        return <Latex>{`\\[${value.expression}\\]`}</Latex>;
      default:
        return <div> ❌ Unsupported block</div>;
    }
  } catch {}

  return <p>to implement this func</p>;
};
export default NotionBlock;
