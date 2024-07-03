import { TiptapLink } from "novel/extensions"
import { mergeAttributes } from "@tiptap/core"

export const CustomLink = TiptapLink.extend({
  inclusive: false,

  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: "text-muted-foreground underline underline-offset-4 hover:text-primary transition-colors cursor-pointer text-wrap break-all whitespace-normal",
      },
    }
  },

  parseHTML() {
    return [{ tag: 'a[href]:not([href *= "javascript:" i])' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['a', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setLink: attributes => ({ chain, editor }) => {
        // Check if the current selection is in the first heading
        const { from } = editor.state.selection
        const firstNode = editor.state.doc.firstChild
        const isFirstHeading = firstNode && firstNode.type.name === 'heading' && from < firstNode.nodeSize

        if (isFirstHeading) {
          return false
        }

        return chain()
          .setMark(this.name, attributes)
          .setMeta('preventAutolink', true)
          .run()
      },
      toggleLink: attributes => ({ chain, editor }) => {
        // Similar check as setLink
        const { from } = editor.state.selection
        const firstNode = editor.state.doc.firstChild
        const isFirstHeading = firstNode && firstNode.type.name === 'heading' && from < firstNode.nodeSize

        if (isFirstHeading) {
          return false
        }

        return chain()
          .toggleMark(this.name, attributes, { extendEmptyMarkRange: true })
          .setMeta('preventAutolink', true)
          .run()
      },
      unsetLink: () => ({ chain }) => {
        return chain()
          .unsetMark(this.name, { extendEmptyMarkRange: true })
          .setMeta('preventAutolink', true)
          .run()
      },
    }
  },
})

export const customLink = CustomLink.configure({
  protocols: ["ftp", "mailto"],
})
