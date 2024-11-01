import React, { memo, useCallback } from 'react';
import { Editor } from '@tiptap/core';
import isTextSelected from '@/components/RichText/lib/editor';
import { ToolbarComponent } from '@/components/RichText/ui/toolbar';
import { Link2 } from 'lucide-react';

interface ToolbarButtonLinkProps {
  editor: Editor;
}

export const ToolbarButtonLink = ({ editor }: ToolbarButtonLinkProps) => {
  const onLink = useCallback(() => {
    if (!isTextSelected(editor)) return;

    // @ts-ignore
    editor.chain().focus().toggleLink({ class: 'fake_link' }).run();
  }, [editor]);

  return (
    <ToolbarComponent.Button tooltip='Link' onClick={onLink}>
      <Link2 />
    </ToolbarComponent.Button>
  );
};

export default memo(ToolbarButtonLink, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
