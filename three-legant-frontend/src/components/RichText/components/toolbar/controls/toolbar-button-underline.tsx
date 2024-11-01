import { useActive } from '@/components/RichText/hooks/use-active';
import { ToolbarComponent } from '@/components/RichText/ui/toolbar';
import { Editor } from '@tiptap/core';
import { Underline } from 'lucide-react';
import React, { memo, useCallback } from 'react';
interface ToolbarButtonUnderlineProps {
  editor: Editor;
}

const ToolbarButtonUnderline = ({ editor }: ToolbarButtonUnderlineProps) => {
  const isUnderlineActive = useActive(editor, 'underline');
  const onUnderline = useCallback(
    () => editor.chain().focus().toggleUnderline().run(),
    [editor]
  );

  return (
    <ToolbarComponent.Button
      tooltip='Underline'
      tooltipShortcut={['Mod', 'U']}
      active={isUnderlineActive}
      onClick={onUnderline}
    >
      <Underline />
    </ToolbarComponent.Button>
  );
};

export default memo(ToolbarButtonUnderline, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
