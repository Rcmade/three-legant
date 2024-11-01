import { mergeAttributes } from "@tiptap/core";
import TiptapHeading from "@tiptap/extension-heading";
// 
type Levels = 1 | 2 | 3 | 4 | 5 | 6;

const classes: Record<Levels, string> = {
  1: "text-4xl font-bold",
  2: "text-3xl font-semibold",
  3: "text-2xl font-medium",
  4: "text-xl font-normal",
  5: "text-lg",
  6: "text-base",
};

export const Heading = TiptapHeading.configure({
  levels: [1, 2, 3, 4, 5, 6],
}).extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("id"),
        renderHTML: (attributes) => ({
          id: attributes.id,
        }),
      },
    };
  },
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level: Levels = hasLevel ? node.attrs.level : this.options.levels[0];

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: `${classes[level]}`,
      }),
      0,
    ];
  },
});

export default Heading;

/* 

.configure({
    levels: [1, 2, 3, 4, 5, 6]
  })
*/
