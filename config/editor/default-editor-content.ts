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
          type: "text",
          text: "Give the app introduction a title",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This is a ",
        },
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "POWERFUL ",
        },
        {
          type: "text",
          marks: [
            {
              type: "strike",
            },
          ],
          text: "poor",
        },
        {
          type: "text",
          text: " rich context editor with many ",
        },
        {
          type: "text",
          marks: [
            {
              type: "underline",
            },
          ],
          text: "features",
        },
        {
          type: "text",
          text: " allowing you to create a ",
        },
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
            {
              type: "italic",
            },
          ],
          text: "appealing",
        },
        {
          type: "text",
          text: " introduction for the ",
        },
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
            {
              type: "italic",
            },
          ],
          text: "fascinating",
        },
        {
          type: "text",
          text: "  ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://aiappstation.com/",
                target: "_blank",
                rel: "noopener noreferrer nofollow",
                class:
                  "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
              },
            },
          ],
          text: "app",
        },
        {
          type: "text",
          text: " you are submitting. This is built on top of ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://github.com/steven-tey/novel",
                target: "_blank",
                rel: "noopener noreferrer nofollow",
                class:
                  "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
              },
            },
            {
              type: "bold",
            },
          ],
          text: "novel",
        },
        {
          type: "text",
          text: ".",
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
          type: "text",
          text: "5 Main Editor Actions",
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
                  type: "text",
                  text: "Start typing to add your content",
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
                  type: "text",
                  text: "Select ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "underline",
                    },
                  ],
                  text: "text",
                },
                {
                  type: "text",
                  text: " to customize it",
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
                  type: "text",
                  text: "Press '/' to open the command menu",
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
                  type: "text",
                  text: "Select Text to embed links or videos (Youtube)",
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
                  type: "text",
                  text: "Automatically saves your content when you stoped typing",
                },
              ],
            },
            {
              type: "paragraph",
            },
          ],
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
          type: "text",
          text: "Displaying  code snippets",
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
          type: "text",
          text: "bunx --bun shadcn-ui@latest init",
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
          type: "text",
          text: "Usage",
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
          type: "text",
          text: 'import { Button } from "@/components/ui/button"\n\nexport default function App() {\n  return (\n     <Button>Button</Button>\n  )\n}',
        },
      ],
    },
    {
      type: "paragraph",
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
          type: "text",
          text: "Features",
        },
      ],
    },
    {
      type: "orderedList",
      attrs: {
        tight: true,
        start: 1,
      },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Slash menu & bubble menu",
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
                  type: "text",
                  text: "Grab the handle to drag and drop the nodes",
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
                  type: "text",
                  text: "AI autocomplete (type ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                  text: "++",
                },
                {
                  type: "text",
                  text: " to activate, or select from slash menu)",
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
                  type: "text",
                  text: "Image uploads (drag & drop / copy & paste, or select from slash menu)  (WIP, might not working just yet)",
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
                  type: "text",
                  text: "Rich text editing",
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
                  type: "text",
                  text: "Capture Quote",
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
                  type: "text",
                  text: "To-do List",
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
                  type: "text",
                  text: "Bullet List",
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
                  type: "text",
                  text: "Numbered List",
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
                  type: "text",
                  text: "Embedding links",
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
                  type: "text",
                  text: "Embedding youtube videos",
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
                  type: "text",
                  text: 'Press "---" for adding seperator',
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
        src: "https://public.blob.vercel-storage.com/pJrjXbdONOnAeZAZ/banner-2wQk82qTwyVgvlhTW21GIkWgqPGD2C.png",
        alt: "banner.png",
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
