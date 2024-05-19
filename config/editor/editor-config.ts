export const CHARS_LIMIT = 5000

export const MAX_RETRY_ATTEMPTS = 3

export const EMPTY_CONTENT_STRING = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 1,
      },
    },
  ],
}

export const UNTITLED_HEADING = {
  type: "heading",
  attrs: {
    level: 1,
  },
  content: [
    {
      text: "Untitled",
      type: "text",
    },
  ],
}
