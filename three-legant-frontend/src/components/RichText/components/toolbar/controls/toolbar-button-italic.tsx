import { useActive } from '@/components/RichText/hooks/use-active';
import { ToolbarComponent } from '@/components/RichText/ui/toolbar';
import { Editor } from '@tiptap/core';
import { Italic } from 'lucide-react';
import React, { memo, useCallback } from 'react';

interface ToolbarButtonItalicProps {
  editor: Editor;
}

const ToolbarButtonItalic = ({ editor }: ToolbarButtonItalicProps) => {
  const isItalicActive = useActive(editor, 'italic');
  const onItalic = useCallback(
    () => editor.chain().focus().toggleItalic().run(),
    [editor]
  );

  return (
    <ToolbarComponent.Button
      tooltip='Bulleted List'
      tooltipShortcut={['Mod', 'Shift', '8']}
      active={isItalicActive}
      onClick={onItalic}
    >
      <Italic />
    </ToolbarComponent.Button>
  );
};

export default memo(ToolbarButtonItalic, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
