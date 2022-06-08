import { Client } from "@notionhq/client";
import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
const databaseId =
  process.env.NOTION_DATABASE_ID || "8070d0d3-c40d-4343-ad7f-468b377be5ed";

// get published pages objects which are descending sorted
// if has slug pram -> get the specific page of that slug
export const getDatabase = async (slug?: string) => {
  let queryObject: any = {
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "published",
          checkbox: { equals: true },
        },
      ],
    },
    sorts: [
      {
        property: "date",
        direction: "descending",
      },
    ],
  };
  if (slug) {
    queryObject.filter.and.push({
      property: "slug",
      rich_text: { equals: slug },
    });
  }

  const response = await notion.databases.query(queryObject);
  return response.results; // results is an array of page objects
};

export const queryDatabaseByTag = async (tag?: string) => {
  let queryObject: any = {
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "published",
          checkbox: { equals: true },
        },
        {
          property: "tag",
          multi_select: {
            contains: tag,
          },
        },
        // {
        //   property: "tag",
        //   contains: tag,
        // },
      ],
    },
    sorts: [
      {
        property: "date",
        direction: "descending",
      },
    ],
  };

  const response = await notion.databases.query(queryObject);
  return response.results; // results is an array of page objects
};

export const getPageProps = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

// get all blocks of the first level of the block
export const getBlocks = async (blockId: string) => {
  const blocks = [];
  let cursor; // with the undefined cursor, results come from the beginning of the list
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

export const searchDatabase = async (query: string) => {
  const response = await notion.search({
    query: query,
    filter: { value: "page", property: "object" },
    sort: { direction: "ascending", timestamp: "last_edited_time" },
  });
};
