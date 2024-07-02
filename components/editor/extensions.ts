import CharacterCount from "@tiptap/extension-character-count"
import Document from "@tiptap/extension-document"
import Youtube from "@tiptap/extension-youtube"
import { cx } from "class-variance-authority"
import {
  AIHighlight,
  HorizontalRule,
  Placeholder,
  StarterKit,
  TaskItem,
  TaskList,
  TiptapImage,
  TiptapLink,
  UpdatedImage,
} from "novel/extensions"
import { UploadImagesPlugin } from "novel/plugins"
import AutoJoiner from "tiptap-extension-auto-joiner"
import GlobalDragHandle from "tiptap-extension-global-drag-handle"

import { TweetExtension } from "./tweet-extension"

const aiHighlight = AIHighlight

const globalDragHandle = GlobalDragHandle.configure({
  dragHandleWidth: 25, // default
  scrollTreshold: 100, // default
})

const autoJoiner = AutoJoiner.configure({
  elementsToJoin: ["bulletList", "orderedList"], // default
})

const twitter = TweetExtension.configure({
  HTMLAttributes: {
    class: cx(""),
  },
})

const customDocument = Document.extend({
  content: "heading block*",
})

const placeholder = Placeholder.configure({
  placeholder: ({ node }) => {
    if (node.type.name === "heading") {
      return "What’s this story about?"
    }
    return "Press '/' for commands"
  },
})

const tiptapLink = TiptapLink.configure({
  protocols: ["ftp", "mailto"],
  HTMLAttributes: {
    class: cx(
      "text-muted-foreground underline underline-offset-4 hover:text-primary transition-colors cursor-pointer text-wrap break-all whitespace-normal"
    ),
  },
})

const youtube = Youtube.configure({
  HTMLAttributes: {
    class: cx("rounded-lg border"),
  },
  inline: false,
})

const characterCount = CharacterCount.configure({
  limit: 5000,
})

const tiptapImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: cx("opacity-40 rounded-lg border border-stone-200"),
      }),
    ]
  },
}).configure({
  allowBase64: true,
  HTMLAttributes: {
    class: cx("rounded-lg border border-muted"),
  },
})

const updatedImage = UpdatedImage.configure({
  HTMLAttributes: {
    class: cx("rounded-lg border border-muted"),
  },
})

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cx("not-prose pl-2 "),
  },
})
const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cx("flex gap-2 items-start my-4"),
  },
  nested: true,
})

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cx("mt-4 mb-6 border-t border-muted-foreground"),
  },
})

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cx("list-disc list-outside leading-3 -mt-2"),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cx("list-decimal list-outside leading-3 -mt-2"),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cx("leading-normal -mb-2"),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cx("border-l-4 border-primary"),
    },
  },
  codeBlock: {
    HTMLAttributes: {
      class: cx(
        "rounded-md bg-muted text-muted-foreground border p-5 font-mono font-medium"
      ),
    },
  },
  code: {
    HTMLAttributes: {
      class: cx("rounded-md bg-muted  px-1.5 py-1 font-mono font-medium"),
      spellcheck: "false",
    },
  },
  horizontalRule: false,
  dropcursor: {
    color: "#DBEAFE",
    width: 4,
  },
  gapcursor: false,
  document: false,
})

export const defaultExtensions = [
  globalDragHandle,
  autoJoiner,
  customDocument,
  starterKit,
  placeholder,
  tiptapLink,
  tiptapImage,
  updatedImage,
  youtube,
  characterCount,
  taskList,
  taskItem,
  horizontalRule,
  aiHighlight,
  twitter,
]
