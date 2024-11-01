import React, { useCallback } from 'react';
import { Editor } from '@tiptap/core';
import { Undo } from 'lucide-react';
import { ToolbarComponent } from '@/components/RichText/ui/toolbar';

interface ToolbarButtonUndoProps {
  editor: Editor;
}

const ToolbarButtonUndo = ({ editor }: ToolbarButtonUndoProps) => {
  const onUndo = useCallback(
    () => editor.chain().focus().undo().run(),
    [editor]
  );

  return (
    <ToolbarComponent.Button
      tooltip='Undo'
      tooltipShortcut={['Mod', 'Z']}
      disabled={!editor.can().undo()}
      onClick={onUndo}
    >
      <Undo />
    </ToolbarComponent.Button>
  );
};

export default ToolbarButtonUndo;
