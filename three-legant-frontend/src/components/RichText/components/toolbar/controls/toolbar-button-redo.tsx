import React, { useCallback } from 'react';
import { Editor } from '@tiptap/core';
import { ToolbarComponent } from '@/components/RichText/ui/toolbar';
import { Redo } from 'lucide-react';

interface ToolbarButtonRedoProps {
  editor: Editor;
}

const ToolbarButtonRedo = ({ editor }: ToolbarButtonRedoProps) => {
  const onRedo = useCallback(
    () => editor.chain().focus().redo().run(),
    [editor]
  );

  return (
    <ToolbarComponent.Button
      tooltip='Redo'
      tooltipShortcut={['Mod', 'Y']}
      disabled={!editor.can().redo()}
      onClick={onRedo}
    >
      <Redo />
    </ToolbarComponent.Button>
  );
};

export default ToolbarButtonRedo;
