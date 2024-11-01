import React from 'react';
import { ToolbarComponent } from '../ui/toolbar';
import { Link2Off, Pen } from 'lucide-react';

interface LinkPanelPreviewProps {
  url: string;
  onEdit: () => void;
  onRemove: () => void;
}

const LinkPanelPreview = ({ url, onEdit, onRemove }: LinkPanelPreviewProps) => {
  return (
    <div className='rounded-md border bg-white text-black shadow-md outline-none px-3 py-2'>
      <div className='flex items-center'>
        <a
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm link  text-blue-500 underline font-medium'
        >
          <span className='min-w-[9rem] flex items-center w-full text-ellipsis overflow-hidden'>
            {url}
          </span>
        </a>
        <ToolbarComponent.Divider className='h-full' />
        <ToolbarComponent.Group>
          <ToolbarComponent.Button onClick={onEdit}>
            <Pen className='w-[18px] h-6' />
          </ToolbarComponent.Button>
          <ToolbarComponent.Button onClick={onRemove}>
            <Link2Off className='w-[18px] h-6' />
          </ToolbarComponent.Button>
        </ToolbarComponent.Group>
      </div>
    </div>
  );
};

export default LinkPanelPreview;
