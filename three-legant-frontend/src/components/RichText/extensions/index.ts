import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextStyle from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import Link from './link';
import Image from './image-resize';
import CodeBlockLowlight from './code-block-lowlight/code-block-lowlight';
import Heading from './heading';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
// import Gapcursor from '@tiptap/extension-gapcursor';

const CustomTable = Table.extend({
  atom: true,
  selectable: true,
  draggable: false,
  isolating: true,
  allowGapCursor: false
});

export const extensions = [
  Image,
  StarterKit.configure({
    heading: false,
    horizontalRule: false,
    codeBlock: false,
    hardBreak: false,
    dropcursor: {}
  }),
  Heading,
  Underline,
  TextAlign.configure({
    types: ['heading', 'paragraph', 'image']
  }),
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true
  }),
  Link.configure({
    openOnClick: false
  }),
  Placeholder.configure({
    placeholder: 'Type or paste your content here!'
  }),
  CodeBlockLowlight,
  CharacterCount,
  // Gapcursor,
  CustomTable.configure({
    resizable: true,
    allowTableNodeSelection: true
  }),
  TableCell,
  TableHeader,
  TableRow
];
