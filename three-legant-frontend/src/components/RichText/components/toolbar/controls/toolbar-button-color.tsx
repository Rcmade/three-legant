import React, { memo, useCallback } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { useAttributes } from '@/components/RichText/hooks/use-attributes';
import { ToolbarComponent } from '@/components/RichText/ui/toolbar';
import { Editor } from '@tiptap/core';
import { Baseline } from 'lucide-react';
import { ColorPicker } from '../../color-picker';

type ToolbarButtonColorProps = {
  editor: Editor;
};

const ToolbarButtonColor = ({ editor }: ToolbarButtonColorProps) => {
  const textColor = useAttributes(
    editor,
    'textStyle',
    { color: undefined },
    (attr) => attr.color
  );

  const onColorChange = useCallback(
    (color: string) => editor.chain().setColor(color).run(),
    [editor]
  );

  const onResetColor = useCallback(
    () => editor.chain().focus().unsetColor().run(),
    [editor]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToolbarComponent.Button tooltip={'Text Color'}>
          <Baseline
            style={{ color: textColor }}
            className={
              ' [&>path:not(:first-child)]:text-black [&>path:not(:first-child)]:dark:text-slate-400'
            }
          />
        </ToolbarComponent.Button>
      </PopoverTrigger>

      <PopoverContent align='start' side='top' className='w-auto'>
        <ColorPicker
          color={textColor}
          onChange={onColorChange}
          onClear={onResetColor}
        />
      </PopoverContent>
    </Popover>
  );
};

export default memo(ToolbarButtonColor, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
