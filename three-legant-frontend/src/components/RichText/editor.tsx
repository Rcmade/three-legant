"use client";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { EditorContent, EditorOptions, useEditor } from "@tiptap/react";
import { extensions as builtInExtensions } from "./extensions";
import { EditorInstance } from ".";
import Toolbar from "./components/toolbar";
import BubbleToolbar from "./components/toolbar/bubble-toolbar";
import "./styles/index.scss";

export interface EditorProps extends Partial<EditorOptions> {
  toolBarClassName?: string;
  wrapperClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  displayWordsCount?: boolean;
  placeholder?: string;
}

export type EditorRef = {
  getEditor: () => EditorInstance;
};

export const Editor = forwardRef<EditorRef, EditorProps>(
  (
    {
      wrapperClassName,
      toolBarClassName,
      contentClassName,
      footerClassName,
      extensions = [],
      editable = true,
      editorProps,
      content,
      displayWordsCount = true,
      // onUpdateToC,
      placeholder,
      ...rest
    },
    ref,
  ) => {
    const editor = useEditor(
      {
        extensions: [...builtInExtensions, ...extensions],
        immediatelyRender: false,
        content,
        editorProps: {
          attributes: {
            class:
              "py-6 px-8 prose prose-base prose-blue prose-headings:scroll-mt-[80px] dark:prose-invert max-w-none [&_ol]:list-decimal [&_ul]:list-disc",
          },
          ...editorProps,
        },
        ...rest,
      },
      [],
    );

    useImperativeHandle(ref, () => ({
      getEditor: () => editor!,
    }));

    useEffect(() => {
      return () => {
        editor?.destroy();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!editor) return null;

    return (
      <div className={wrapperClassName}>
        {editable && (
          <>
            <Toolbar editor={editor} className={toolBarClassName} />
            <BubbleToolbar editor={editor} />
          </>
        )}

        <EditorContent
          placeholder={placeholder}
          editor={editor}
          className={contentClassName}
          disabled={true}
        />

        {editable && displayWordsCount && (
          <div
            className={`sticky bottom-0 border-t border-t-border px-4 py-3 text-right text-sm font-bold ${footerClassName}`}
          >
            {editor.storage.characterCount.words()} words
          </div>
        )}
      </div>
    );
  },
);

Editor.displayName = "Editor";

export default Editor;
