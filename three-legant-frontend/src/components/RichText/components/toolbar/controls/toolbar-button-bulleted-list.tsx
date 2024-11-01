import { useActive } from '@/components/RichText/hooks/use-active';
import { ToolbarComponent } from '@/components/RichText/ui/toolbar';
import { Editor } from '@tiptap/core';
import { List } from 'lucide-react';
import React, { memo, useCallback } from 'react';
interface ToolbarButtonBulletListProps {
  editor: Editor;
}

const ToolbarButtonBulletedList = ({
  editor
}: ToolbarButtonBulletListProps) => {
  const isBulletList = useActive(editor, 'bulletList');
  const onBulletList = useCallback(
    () => editor.chain().focus().toggleBulletList().run(),
    [editor]
  );

  return (
    <ToolbarComponent.Button active={isBulletList} onClick={onBulletList}>
      <List />
    </ToolbarComponent.Button>
  );
};

export default memo(ToolbarButtonBulletedList, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
