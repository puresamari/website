'use client';

import classNames from 'classnames';
import { ReactNode, memo } from 'react';
import { PanelPopupTitle } from './panel-popup.component';

export type Theme = 'red' | 'beige' | 'green' | 'blue' | 'pink' | 'black' | 'white';

export const Panel = memo<{
  children: ReactNode;
  theme: Theme;
  label: ReactNode;
  full?: boolean;
  sticky?: { rtl?: boolean; children: ReactNode };
}>(({ children, theme, label, sticky, full }) => {
  const colorCls = classNames(' text ', {
    // 'color-white': theme === 'black' || theme === 'green',
    'bg-white text-red-500 border-red-500': theme === 'red',
    'bg-orange-100 text-orange-800 border-orange-800': theme === 'beige',
    'bg-emerald-500 text-black border-black': theme === 'green',
    'bg-black text-white border-white': theme === 'black',
    'bg-white text-black border-black': theme === 'white',
    'bg-cyan-100 text-blue-700 border-blue-700': theme === 'blue',
    'bg-pink-500 text-pink-100 border-pink-100': theme === 'pink',
  });
  const cls = classNames({ 'p-4': full }, colorCls);
  return (
    <section className={cls}>
      {full ? (
        <>
          <h2 className=" type-headline-2 uppercase ">{label}</h2>
          {sticky ? (
            <div className={classNames('flex w-full', sticky.rtl ? 'flex-row-reverse' : 'flex-row')}>
              <div className="flex flex-col w-full">{children}</div>
              <div className="flex flex-col relative">
                <div className="flex flex-col sticky top-0">{sticky.children}</div>
              </div>
            </div>
          ) : (
            children
          )}
        </>
      ) : (
        <PanelPopupTitle label={label} colorCls={colorCls}>
          {sticky ? (
            <div className={classNames('flex w-full', sticky.rtl ? 'flex-row-reverse' : 'flex-row')}>
              <div className="flex flex-col w-full">{children}</div>
              <div className="flex flex-col relative">
                <div className="flex flex-col sticky top-0">{sticky.children}</div>
              </div>
            </div>
          ) : (
            children
          )}
        </PanelPopupTitle>
      )}
    </section>
  );
});
