export const defaultEditorContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 1,
      },
      content: [
        {
          text: "What's the title?",
          type: "text",
        },
      ],
    },
    {
      type: "paragraph",
    },
    {
      type: "paragraph",
      content: [
        {
          text: "This is a ",
          type: "text",
        },
        {
          text: "POWERFUL ",
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
        },
        {
          text: "poor",
          type: "text",
          marks: [
            {
              type: "strike",
            },
          ],
        },
        {
          text: " rich context editor with many ",
          type: "text",
        },
        {
          text: "features",
          type: "text",
          marks: [
            {
              type: "underline",
            },
          ],
        },
        {
          text: " allowing you to create a ",
          type: "text",
        },
        {
          text: "appealing",
          type: "text",
          marks: [
            {
              type: "bold",
            },
            {
              type: "italic",
            },
          ],
        },
        {
          text: " introduction for the ",
          type: "text",
        },
        {
          text: "fascinating",
          type: "text",
          marks: [
            {
              type: "bold",
            },
            {
              type: "italic",
            },
          ],
        },
        {
          text: "  ",
          type: "text",
        },
        {
          text: "app",
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                rel: "noopener noreferrer nofollow",
                href: "https://aiappstation.com/",
                class:
                  "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
                target: "_blank",
              },
            },
          ],
        },
        {
          text: " you are submitting. This is built on top of ",
          type: "text",
        },
        {
          text: "novel",
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                rel: "noopener noreferrer nofollow",
                href: "https://github.com/steven-tey/novel",
                class:
                  "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
                target: "_blank",
              },
            },
            {
              type: "bold",
            },
          ],
        },
        {
          text: ".",
          type: "text",
        },
      ],
    },
    {
      type: "paragraph",
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          text: "5 Main Editor Actions",
          type: "text",
        },
      ],
    },
    {
      type: "taskList",
      content: [
        {
          type: "taskItem",
          attrs: {
            checked: true,
          },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Start typing to add your content",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: {
            checked: false,
          },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Select ",
                  type: "text",
                },
                {
                  text: "text",
                  type: "text",
                  marks: [
                    {
                      type: "underline",
                    },
                  ],
                },
                {
                  text: " to customize it",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: {
            checked: false,
          },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Press '/' to open the command menu",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: {
            checked: false,
          },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Select Text to embed links or videos (Youtube)",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: {
            checked: true,
          },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Automatically saves your content when you stoped typing",
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          text: "Displaying  code snippets",
          type: "text",
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: {
        language: null,
      },
      content: [
        {
          text: "bunx --bun shadcn-ui@latest init",
          type: "text",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          text: "Usage",
          type: "text",
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: {
        language: null,
      },
      content: [
        {
          text: 'import { Button } from "@/components/ui/button"\n\nexport default function App() {\n  return (\n     <Button>Button</Button>\n  )\n}',
          type: "text",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          text: "Embed tweet",
          type: "text",
        },
      ],
    },
    {
      type: "twitter",
      attrs: {
        url: "https://twitter.com/vercel/status/1683920951807971329",
      },
    },
    {
      type: "horizontalRule",
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          text: "Features",
          type: "text",
        },
      ],
    },
    {
      type: "orderedList",
      attrs: {
        start: 1,
        tight: true,
      },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Slash menu & bubble menu",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Grab the handle to drag and drop the nodes",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "(working in progress) AI autocomplete (type ",
                  type: "text",
                },
                {
                  text: "++",
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                },
                {
                  text: " to activate, or select from slash menu)",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Image uploads (drag & drop / copy & paste, or select from slash menu)  (WIP, might not working just yet)",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Rich text editing",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Capture Quote",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "To-do List",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Bullet List",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Numbered List",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Embedding links",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Embedding youtube videos",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Embedding tweet",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: 'Press "---" for adding seperator',
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "horizontalRule",
    },
    {
      type: "paragraph",
    },
    {
      type: "image",
      attrs: {
        alt: "banner.png",
        src: "https://public.blob.vercel-storage.com/pJrjXbdONOnAeZAZ/banner-2wQk82qTwyVgvlhTW21GIkWgqPGD2C.png",
        title: "banner.png",
        width: null,
        height: null,
      },
    },
    {
      type: "paragraph",
    },
  ],
}

export const defaultEditorContentWithoutHeading = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 1,
      },
    },
    {
      type: "paragraph",
    },
    {
      type: "paragraph",
      content: [
        {
          text: "This is a ",
          type: "text",
        },
        {
          text: "POWERFUL ",
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
        },
        {
          text: "poor",
          type: "text",
          marks: [
            {
              type: "strike",
            },
          ],
        },
        {
          text: " rich context editor with many ",
          type: "text",
        },
        {
          text: "features",
          type: "text",
          marks: [
            {
              type: "underline",
            },
          ],
        },
        {
          text: " allowing you to create a ",
          type: "text",
        },
        {
          text: "appealing",
          type: "text",
          marks: [
            {
              type: "bold",
            },
            {
              type: "italic",
            },
          ],
        },
        {
          text: " introduction for the ",
          type: "text",
        },
        {
          text: "fascinating",
          type: "text",
          marks: [
            {
              type: "bold",
            },
            {
              type: "italic",
            },
          ],
        },
        {
          text: "  ",
          type: "text",
        },
        {
          text: "app",
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                rel: "noopener noreferrer nofollow",
                href: "https://aiappstation.com/",
                class:
                  "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
                target: "_blank",
              },
            },
          ],
        },
        {
          text: " you are submitting. This is built on top of ",
          type: "text",
        },
        {
          text: "novel",
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                rel: "noopener noreferrer nofollow",
                href: "https://github.com/steven-tey/novel",
                class:
                  "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
                target: "_blank",
              },
            },
            {
              type: "bold",
            },
          ],
        },
        {
          text: ".",
          type: "text",
        },
      ],
    },
    {
      type: "paragraph",
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          text: "5 Main Editor Actions",
          type: "text",
        },
      ],
    },
    {
      type: "taskList",
      content: [
        {
          type: "taskItem",
          attrs: {
            checked: true,
          },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Start typing to add your content",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: {
            checked: false,
          },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Select ",
                  type: "text",
                },
                {
                  text: "text",
                  type: "text",
                  marks: [
                    {
                      type: "underline",
                    },
                  ],
                },
                {
                  text: " to customize it",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: {
            checked: false,
          },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Press '/' to open the command menu",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: {
            checked: false,
          },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Select Text to embed links or videos (Youtube)",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: {
            checked: true,
          },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Automatically saves your content when you stoped typing",
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          text: "Displaying  code snippets",
          type: "text",
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: {
        language: null,
      },
      content: [
        {
          text: "bunx --bun shadcn-ui@latest init",
          type: "text",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          text: "Usage",
          type: "text",
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: {
        language: null,
      },
      content: [
        {
          text: 'import { Button } from "@/components/ui/button"\n\nexport default function App() {\n  return (\n     <Button>Button</Button>\n  )\n}',
          type: "text",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          text: "Embed tweet",
          type: "text",
        },
      ],
    },
    {
      type: "twitter",
      attrs: {
        url: "https://twitter.com/vercel/status/1683920951807971329",
      },
    },
    {
      type: "horizontalRule",
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          text: "Features",
          type: "text",
        },
      ],
    },
    {
      type: "orderedList",
      attrs: {
        start: 1,
        tight: true,
      },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Slash menu & bubble menu",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Grab the handle to drag and drop the nodes",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "(working in progress) AI autocomplete (type ",
                  type: "text",
                },
                {
                  text: "++",
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                },
                {
                  text: " to activate, or select from slash menu)",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Image uploads (drag & drop / copy & paste, or select from slash menu)  (WIP, might not working just yet)",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Rich text editing",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Capture Quote",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "To-do List",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Bullet List",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Numbered List",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Embedding links",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Embedding youtube videos",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Embedding tweet",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: 'Press "---" for adding seperator',
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "horizontalRule",
    },
    {
      type: "paragraph",
    },
    {
      type: "image",
      attrs: {
        alt: "banner.png",
        src: "https://public.blob.vercel-storage.com/pJrjXbdONOnAeZAZ/banner-2wQk82qTwyVgvlhTW21GIkWgqPGD2C.png",
        title: "banner.png",
        width: null,
        height: null,
      },
    },
    {
      type: "paragraph",
    },
  ],
}
