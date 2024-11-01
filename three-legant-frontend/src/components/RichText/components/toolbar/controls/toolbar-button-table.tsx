import { Editor } from '@tiptap/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ReactNode, useCallback } from 'react';
import { useActive } from '@/components/RichText/hooks/use-active';
import { ToolbarComponent } from '@/components/RichText/ui/toolbar';
import { TableIcon } from 'lucide-react';

type IOption = {
  label: string;
  action: () => void;
};
const getTableMenus = (editor: Editor): IOption[] => [
  {
    label: 'Insert Table',
    action: () =>
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: false })
        .run()
  },
  {
    label: 'Add Column Before',
    action: () => editor.chain().focus().addColumnBefore().run()
  },
  {
    label: 'Add Column After',
    action: () => editor.chain().focus().addColumnAfter().run()
  },
  {
    label: 'Add Row Before',
    action: () => editor.chain().focus().addRowBefore().run()
  },
  {
    label: 'Add Row After',
    action: () => editor.chain().focus().addRowAfter().run()
  },
  {
    label: 'Delete Column',
    action: () => editor.chain().focus().deleteColumn().run()
  },
  {
    label: 'Delete Row',
    action: () => editor.chain().focus().deleteRow().run()
  },
  {
    label: 'Delete Table',
    action: () => editor.chain().focus().deleteTable().run()
  },
  {
    label: 'Merge Cells',
    action: () => editor.chain().focus().mergeCells().run()
  },
  {
    label: 'Merge Or Split',
    action: () => editor.chain().focus().mergeOrSplit().run()
  },
  {
    label: 'Toggle Header Column',
    action: () => editor.chain().focus().toggleHeaderColumn().run()
  },
  {
    label: 'Toggle Header Row',
    action: () => editor.chain().focus().toggleHeaderRow().run()
  },
  {
    label: 'Toggle Header Cell',
    action: () => editor.chain().focus().toggleHeaderCell().run()
  },
  {
    label: 'Set Cell Attribute',
    action: () => editor.chain().focus().setCellAttribute('colspan', 2).run()
  }
];

type Props = {
  editor: Editor;
  className?: string;
  anchorEl?: null | HTMLElement;
};
const ToolbarTableButton = ({ editor }: Props) => {
  const isTableActive = useActive(editor, 'table');

  const onTable = useCallback(
    () =>
      editor
        .chain()
        .focus()
        .insertTable({ rows: 2, cols: 3, withHeaderRow: false })
        .run(),
    [editor]
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ToolbarComponent.Button
            tooltip='Table'
            // tooltipShortcut={['Mod', 'T']}
            active={isTableActive}
            onClick={onTable}
          >
            <TableIcon />
          </ToolbarComponent.Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {getTableMenus(editor).map((menu, index) => (
            <DropdownMenuItem
              className='cursor-pointer'
              key={index}
              onClick={() => {
                menu.action();
              }}
            >
              {menu.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ToolbarTableButton;
