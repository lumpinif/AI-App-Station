import { JSONContent } from "novel"

import { UNTITLED_HEADING } from "@/config/editor/editor-config"
import { ContentRenderer } from "@/components/editor/content-renderer"

type StoryTitleProps = {
  firstHeading: JSONContent | typeof UNTITLED_HEADING
  post_content: JSONContent
}

export const StoryContentTitle: React.FC<StoryTitleProps> = ({
  firstHeading,
  post_content,
}) => {
  const hasFirstHeadingContent = !!post_content?.content?.find(
    (node: any) => node.type === "heading"
  )?.content

  const firstHeadingContent = {
    type: "doc",
    content: [hasFirstHeadingContent ? firstHeading : UNTITLED_HEADING],
  }

  return <ContentRenderer content={firstHeadingContent} />
}
