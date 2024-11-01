import React from 'react';
import { Editor } from '@tiptap/core';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { ToolbarComponent } from '@/components/RichText/ui/toolbar';
import ToolbarButtonUndo from './controls/toolbar-button-undo';
import ToolbarButtonRedo from './controls/toolbar-button-redo';
import ToolbarSelectHeading from './controls/toolbar-select-heading';
import ToolbarButtonBold from './controls/toolbar-button-bold';
import ToolbarButtonItalic from './controls/toolbar-button-italic';
import ToolbarButtonUnderline from './controls/toolbar-button-underline';
import ToolbarButtonColor from './controls/toolbar-button-color';
import ToolbarButtonHighlight from './controls/toolbar-button-highlight';
import ToolbarSelectTextAlign from './controls/toolbar-select-text-align';
import ToolbarButtonBulletedList from './controls/toolbar-button-bulleted-list';
import ToolbarButtonOrderedList from './controls/toolbar-button-ordered-list';
import ToolbarButtonImage from './controls/toolbar-button-image';
import ToolbarButtonLink from './controls/toolbar-button-link';
import ToolbarButtonBlockquote from './controls/toolbar-button-blockquote';
import ToolbarButtonCodeblock from './controls/toolbar-button-codeblock';
import ToolbarTableButton from './controls/toolbar-button-table';

export type ToolbarProps = {
  editor: Editor;
  className?: string;
};

const Toolbar = ({ editor, className }: ToolbarProps) => {
  return (
    <TooltipProvider
      disableHoverableContent
      delayDuration={500}
      skipDelayDuration={0}
    >
      <ToolbarComponent.Wrapper className={className}>
        <ToolbarComponent.Group>
          <ToolbarButtonUndo editor={editor} />
          <ToolbarButtonRedo editor={editor} />
        </ToolbarComponent.Group>
        <ToolbarComponent.Divider />
        <ToolbarComponent.Group>
          <ToolbarSelectHeading editor={editor} />
        </ToolbarComponent.Group>
        <ToolbarComponent.Divider />
        <ToolbarComponent.Group>
          <ToolbarButtonBold editor={editor} />
          <ToolbarButtonItalic editor={editor} />
          <ToolbarButtonUnderline editor={editor} />
        </ToolbarComponent.Group>
        <ToolbarComponent.Divider />
        <ToolbarComponent.Group>
          <ToolbarButtonColor editor={editor} />
          <ToolbarButtonHighlight editor={editor} />
        </ToolbarComponent.Group>
        <ToolbarComponent.Divider />
        <ToolbarComponent.Group>
          <ToolbarSelectTextAlign editor={editor} />
        </ToolbarComponent.Group>
        <ToolbarComponent.Divider />
        <ToolbarComponent.Group>
          <ToolbarButtonOrderedList editor={editor} />
          <ToolbarButtonBulletedList editor={editor} />
        </ToolbarComponent.Group>
        <ToolbarComponent.Divider />
        <ToolbarComponent.Group>
          <ToolbarButtonImage editor={editor} />
          <ToolbarButtonLink editor={editor} />
          <ToolbarButtonBlockquote editor={editor} />
          <ToolbarTableButton editor={editor} />
          <ToolbarButtonCodeblock editor={editor} />
        </ToolbarComponent.Group>
      </ToolbarComponent.Wrapper>
    </TooltipProvider>
  );
};

export default Toolbar;
