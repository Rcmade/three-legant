"use client";
import React from "react";
import Editor, { EditorProps } from "./editor";
import { useDebounce } from "@/hooks/useDebounce";
import "./styles/index.scss";

interface EditorInputProps extends EditorProps {
  onChange: (s: string) => void;
  placeholder?: string;
}
const EditorInput = ({ onChange, placeholder, ...rest }: EditorInputProps) => {
  const onChangeHandle = useDebounce(onChange, 800);
  return (
    <Editor
      placeholder={placeholder}
      toolBarClassName="z-50 inset-x-0 w-full bg-toolbar sticky top-0"
      footerClassName="bg-toolbar"
      editorProps={{
        attributes: {
          class:
            "py-6 px-8 prose prose-base prose-blue prose-headings:scroll-mt-[80px] dark:prose-invert",
        },
      }}
      onUpdate={({ editor }) => {
        const html = !editor.isEmpty ? editor.getHTML() : "";
        onChangeHandle(html);
      }}
      {...rest}
    />
  );
};

export default EditorInput;
