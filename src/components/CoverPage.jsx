import React from 'react';

const CoverPage = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className='bg-white text-black'>
      <h1 className='text-[2rem] font-bold text-black'>Cover Page</h1>
      <p className='text-[1rem] text-black'>cover page content</p>
    </div>
  );
});

export default CoverPage;
