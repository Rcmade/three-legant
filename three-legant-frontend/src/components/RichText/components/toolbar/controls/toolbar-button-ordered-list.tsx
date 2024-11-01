import React, { memo, useCallback } from 'react';
import { Editor } from '@tiptap/core';
import { useActive } from '@/components/RichText/hooks/use-active';
import { ToolbarComponent } from '@/components/RichText/ui/toolbar';
import { ListOrdered } from 'lucide-react';

interface ToolbarButtonOrderedListProps {
  editor: Editor;
}

const ToolbarButtonOrderedList = ({
  editor
}: ToolbarButtonOrderedListProps) => {
  const isOrderedList = useActive(editor, 'orderedList');
  const onOrderedList = useCallback(
    () => editor.chain().focus().toggleOrderedList().run(),
    [editor]
  );

  return (
    <ToolbarComponent.Button active={isOrderedList} onClick={onOrderedList}>
      <ListOrdered />
    </ToolbarComponent.Button>
  );
};

export default memo(ToolbarButtonOrderedList, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
