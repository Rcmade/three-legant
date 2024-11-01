import React, { memo, useCallback } from 'react';
import { Editor } from '@tiptap/core';
import { ToolbarComponent } from '@/components/RichText/ui/toolbar';
import { Quote } from 'lucide-react';
import { useActive } from '@/components/RichText/hooks/use-active';

interface ToolbarButtonQuoteProps {
  editor: Editor;
}

const ToolbarButtonBlockquote = ({ editor }: ToolbarButtonQuoteProps) => {
  const isBlockquoteActive = useActive(editor, 'blockquote');
  const onBlockquote = useCallback(
    () => editor.chain().focus().toggleBlockquote().run(),
    [editor]
  );

  return (
    <ToolbarComponent.Button
      tooltip='Blockquote'
      tooltipShortcut={['Mod', 'Shift', 'B']}
      active={isBlockquoteActive}
      onClick={onBlockquote}
    >
      <Quote />
    </ToolbarComponent.Button>
  );
};

export default memo(ToolbarButtonBlockquote, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
