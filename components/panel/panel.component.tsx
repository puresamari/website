'use server';

import classNames from 'classnames';
import { ReactNode } from 'react';

export type Theme = 'red' | 'beige' | 'green' | 'black' | 'white' | 'blue' | 'pink' | 'yellow' | 'orange';

export async function Panel({ id, children, theme, label, className }: {
  children: ReactNode;
  theme: Theme;
  label?: ReactNode;
  id?: string;
  className?: string;
}) {
  const themeCls = classNames({
    'bg-yellow-500 text-yellow-800 border-yellow-800': theme === 'yellow',
    'bg-orange-500 text-orange-800 border-orange-800': theme === 'orange',
    'bg-white text-red-500 border-red-500': theme === 'red',
    'bg-orange-100 text-orange-800 border-orange-800': theme === 'beige',
    'bg-emerald-500 text-black border-black': theme === 'green',
    'bg-black text-white border-white': theme === 'black',
    'bg-white text-black border-black': theme === 'white',
    'bg-cyan-100 text-blue-700 border-blue-700': theme === 'blue',
    'bg-pink-500 text-pink-100 border-pink-100': theme === 'pink',
  });
  return (
    <section className={classNames('p-4 relative', className, themeCls, {
      'relative': label
    })} id={id}>
      {label && <h2 className={classNames(" type-headline-2 uppercase sticky left-0 top-0 z-[1] ", themeCls)}>{label}</h2>}
      {children}
    </section>
  );
};
