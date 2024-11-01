import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useActive } from '@/components/RichText/hooks/use-active';
import { ToolbarComponent } from '@/components/RichText/ui/toolbar';
import { Editor } from '@tiptap/core';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react';
import React, { memo, useMemo } from 'react';

type ToolbarSelectTextAlignProps = {
  editor: Editor;
};

const options = [
  {
    value: 'left',
    label: <AlignLeft />
  },
  {
    value: 'center',
    label: <AlignCenter />
  },
  {
    value: 'right',
    label: <AlignRight />
  },
  {
    value: 'justify',
    label: <AlignJustify />
  }
] as const;

const ToolbarSelectTextAlign = ({ editor }: ToolbarSelectTextAlignProps) => {
  const isAlignCenter = useActive(editor, { textAlign: 'center' });
  const isAlignRight = useActive(editor, { textAlign: 'right' });
  const isAlignJustify = useActive(editor, { textAlign: 'justify' });

  const current = useMemo(() => {
    let key = 'left';
    if (isAlignCenter) {
      key = 'center';
    }
    if (isAlignRight) {
      key = 'right';
    }
    if (isAlignJustify) {
      key = 'justify';
    }
    return options.find((item) => item.value === key)!;
  }, [isAlignCenter, isAlignRight, isAlignJustify]);

  const onAlignSelect = (align: string) => {
    return () => editor.chain().focus().setTextAlign(align).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarComponent.Button
          isDropdown={true}
          className='px-2'
          tooltip={'Text Align'}
        >
          {current.label}
        </ToolbarComponent.Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='start'
        className='min-w-fit'
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={onAlignSelect(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(ToolbarSelectTextAlign, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
