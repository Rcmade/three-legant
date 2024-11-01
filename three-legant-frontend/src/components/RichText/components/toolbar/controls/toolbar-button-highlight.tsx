import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { useAttributes } from '@/components/RichText/hooks/use-attributes';
import { ToolbarComponent } from '@/components/RichText/ui/toolbar';
import { Editor } from '@tiptap/core';
import { Highlighter } from 'lucide-react';
import React, { useCallback } from 'react';
import { ColorPicker } from '../../color-picker';

type ToolbarButtonHighlightProps = {
  editor: Editor;
};

const ToolbarButtonHighlight = ({ editor }: ToolbarButtonHighlightProps) => {
  const highlightColor = useAttributes(
    editor,
    'highlight',
    { color: undefined },
    (attr) => attr.color
  );

  const onResetHighlight = useCallback(
    () => editor.chain().focus().unsetHighlight().run(),
    [editor]
  );

  const onHighlightChange = useCallback(
    (color: string) => editor.chain().setHighlight({ color }).run(),
    [editor]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToolbarComponent.Button
          tooltip={'Text Color'}
          active={Boolean(highlightColor)}
        >
          <Highlighter
            className={
              '[&>path:not(:first-child)]:text-black [&>path:not(:first-child)]:dark:text-slate-400 [&>path:not(:first-child)]:fill-transparent'
            }
            style={{ color: highlightColor, fill: highlightColor }}
          />
        </ToolbarComponent.Button>
      </PopoverTrigger>

      <PopoverContent align='start' side='top' className='w-auto'>
        <ColorPicker
          color={highlightColor}
          onChange={onHighlightChange}
          onClear={onResetHighlight}
        />
      </PopoverContent>
    </Popover>
  );
};

export default ToolbarButtonHighlight;
