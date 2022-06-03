import { Client } from "@notionhq/client";
import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
const databaseId =
  process.env.NOTION_DATABASE_ID || "8070d0d3-c40d-4343-ad7f-468b377be5ed";

// need to imporve the queryObject
export const getDatabase = async () => {
  let queryObject: any = {
    database_id: databaseId,
  };
  const response = await notion.databases.query(queryObject);
  return response.results; // results is an array of objects
};

export const getPageProps = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

// need to figure out
export const getBlocks = async (blockId: string) => {
  const blocks = [];
  let cursor;
  while (true) {
    const { results, next_cursor }: ListBlockChildrenResponse =
      await notion.blocks.children.list({
        start_cursor: cursor,
        block_id: blockId,
      });

    blocks.push(...results);
    if (!next_cursor) break;
    cursor = next_cursor;
  }
  return blocks;
};
