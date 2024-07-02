import { mergeAttributes, Node } from "@tiptap/core"
import {
  nodePasteRule,
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react"
import { Tweet } from "react-tweet"

import ClientTweetCard from "../tweet/client-tweet-card"

export const TweetComponent = ({ node }: NodeViewProps) => {
  const url = node.attrs.url
  const tweetIdRegex = /\/status\/(\d+)/g
  const id = tweetIdRegex.exec(url)?.[1]

  if (!id) {
    return (
      <NodeViewWrapper className="twitter-react-component w-fit sm:mx-auto">
        Invalid Tweet URL
      </NodeViewWrapper>
    )
  }

  return (
    <NodeViewWrapper className="twitter-react-component w-fit sm:mx-auto">
      {/* <Tweet id={id} /> */}
      <ClientTweetCard id={id} />
    </NodeViewWrapper>
  )
}

export const TweetExtension = Node.create({
  name: "twitter",

  group: "block",

  atom: true,

  draggable: true,

  addPasteRules() {
    // Regex to match the Twitter URL pattern with optional leading characters and optional angle brackets
    const twitterUrl =
      /(?:^|\s|[-\s]*)<?(https:\/\/(?:twitter\.com|x\.com)\/.*\/status\/\d+)>?/g

    return [
      nodePasteRule({
        find: twitterUrl,
        type: this.type,
        getAttributes: (match) => {
          // Extract the URL, removing any leading characters and angle brackets
          const url = match[1].trim()
          return { url }
        },
      }),
    ]
  },

  addAttributes() {
    return {
      url: {
        default: "",
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "twitter",
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ["twitter", mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(TweetComponent)
  },
})
