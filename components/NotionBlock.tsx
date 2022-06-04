const NotionBlock = ({ block }: { block: any }) => {
  const { type, id } = block;
  const value = block[type];
  return <p>to implement this func</p>;
};
export default NotionBlock;
