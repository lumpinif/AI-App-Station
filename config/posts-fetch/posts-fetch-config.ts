// postFetchConfig.ts

import { PostFetchConfig } from "@/types/fetch-configs/types-post-fetch-config"

/**
 * Documentation of the useage of postFetchConfig
 *
 *
 *
 *
 *
 *
 **/

const postFetchConfig: PostFetchConfig[] = [
  {
    title: "Trending",
    order: [
      {
        column: "likes_count",
        options: { ascending: false },
      },
    ],
    limit: {
      limit: 15,
    },
    filters: [],
    innerJoinTables: [],
  },
  {
    title: "Featured Stories",
    order: [
      {
        column: "likes_count",
        options: { ascending: false },
      },
    ],
    limit: {
      limit: 15,
    },
    filters: [],
    innerJoinTables: ["post_likes"],
  },
  {
    title: "Most Popular",
    order: [
      {
        column: "likes_count",
        options: { ascending: false },
      },
      {
        column: "views_count",
        options: { ascending: false },
      },
    ],
    limit: {
      limit: 15,
    },
    filters: [],
    innerJoinTables: [],
  },
  {
    title: "Newest Added",

    order: [
      {
        column: "created_at",
        options: { ascending: false },
      },
    ],

    limit: {
      limit: 15,
    },
    filters: [],
    innerJoinTables: [],
  },
  // Add more configurations as needed
]

export default postFetchConfig
