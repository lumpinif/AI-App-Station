// appFetchConfig.ts

import { AppFetchConfig } from "@/types/fetch-configs/types-app-fetch-config"

/**
 * Documentation of the useage of appFetchConfig
 *
 *
 *
 *
 *
 *
 **/

const appFetchConfig: AppFetchConfig[] = [
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
    title: "Featured Apps",
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
    innerJoinTables: ["app_likes"],
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
  {
    title: "Top Free",
    order: [
      {
        column: "likes_count",
        options: { ascending: false },
      },
    ],
    limit: {
      limit: 15,
    },
    orFilters: [
      { filters: "pricing.eq.Free,pricing.eq.Free & In-app purchases" },
    ],
    innerJoinTables: [],
  },
  {
    title: "Top Paid",
    order: [
      {
        column: "likes_count",
        options: { ascending: false },
      },
    ],
    limit: {
      limit: 15,
    },
    filters: [{ operator: "eq", column: "pricing", value: "Paid" }],
    innerJoinTables: [],
  },
  {
    title: "Top Free & In-App Purchases",
    order: [
      {
        column: "likes_count",
        options: { ascending: false },
      },
    ],
    limit: {
      limit: 15,
    },
    filters: [
      { operator: "eq", column: "pricing", value: "Free & In-app purchases" },
    ],
    innerJoinTables: [],
  },
  // {
  //   title: "Top Rated",
  // TODO: IMPLEMENT THIS LATER WE NEED TO DEFINE A RATING COLUMN IN THE DB
  //   column: "",
  //   order: "desc",
  //   limit: 10,
  //   filters: [],
  // },
  // Add more configurations as needed
]

export default appFetchConfig
