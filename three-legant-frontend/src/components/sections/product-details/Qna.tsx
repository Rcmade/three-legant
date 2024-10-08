import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react'

const Qna = () => {
  return (
    <div className='space-y-6'>
      <h1 className="text-2xl">Looking for specific info?</h1>
      <div  className='relative' >
        <Input className='pl-8' placeholder='Search in review, Q&A...' />
        <Search className='absolute pointer-events-none top-2 left-2' />
      </div>
    </div>
  );
}

export default Qna