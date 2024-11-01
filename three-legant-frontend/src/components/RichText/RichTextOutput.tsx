'use client';
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { extensions as builtInExtensions } from './extensions';
import './styles/index.scss';
export interface EditorOutputProps {
  content?: string;
  className?: string;
}

const RichTextOutput: React.FC<EditorOutputProps> = ({
  content,
  className
}) => {
  const editor = useEditor({
    extensions: [...builtInExtensions],
    content,
    editable: false,
    editorProps: {
      attributes: {
        class: 'prose lg:prose-lg prose-blue dark:prose-invert'
      }
    }
  });
  return (
    <div className={className}>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextOutput;
