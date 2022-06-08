import SyntaxHighlighter from "react-syntax-highlighter";
import { obsidian } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const CodeBlock = ({ value }: { value: any }) => {
  return (
    <SyntaxHighlighter
      className="rounded my-4 shadow-lg"
      language={value.language}
      style={obsidian}
      showLineNumbers
    >
      {value.rich_text[0].plain_text}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
