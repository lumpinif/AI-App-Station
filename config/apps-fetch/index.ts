// appFetchConfig.js
const appFetchConfig = [
  {
    key: "trending",
    column: "likes_count",
    order: "desc",
    limit: 10,
    filters: [],
  },
  {
    key: "popular",
    column: "views_count",
    order: "desc",
    limit: 10,
    filters: [],
  },
  {
    key: "newest",
    column: "created_at",
    order: "desc",
    limit: 10,
    filters: [],
  },
  // Add more configurations as needed
]

export default appFetchConfig
