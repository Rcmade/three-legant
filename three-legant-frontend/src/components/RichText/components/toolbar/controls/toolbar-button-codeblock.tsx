import { useActive } from '@/components/RichText/hooks/use-active';
import { ToolbarComponent } from '@/components/RichText/ui/toolbar';
import { Editor } from '@tiptap/core';
import { Code } from 'lucide-react';

import React, { memo } from 'react';

interface ToolbarButtonCodeBlockProps {
  editor: Editor;
}

const ToolbarButtonCodeBlock = ({ editor }: ToolbarButtonCodeBlockProps) => {
  const isCodeBlockActive = useActive(editor, 'codeBlock');
  const onCodeBlock = () => editor.chain().focus().toggleCodeBlock().run();

  return (
    <ToolbarComponent.Button
      tooltip='Code'
      tooltipShortcut={['Mod', 'E']}
      active={isCodeBlockActive}
      onClick={onCodeBlock}
    >
      <Code />
    </ToolbarComponent.Button>
  );
};

export default memo(ToolbarButtonCodeBlock, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
