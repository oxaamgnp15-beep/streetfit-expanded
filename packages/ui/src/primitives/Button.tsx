import * as React from 'react';
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' };
export const Button = React.forwardRef<HTMLButtonElement, Props>(function Button({ variant='primary', className='', ...props }, ref){
  const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 focus:outline-none focus:ring-2';
  const colors = variant==='primary' ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400' : 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300';
  return <button ref={ref} className={`${base} ${colors} ${className}`} {...props} />;
});
