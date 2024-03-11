'use client';

import classNames from 'classnames';
import { createContext, memo, useContext, useMemo } from 'react';

export type Theme = 'red' | 'beige' | 'green' | 'black' | 'white' | 'blue' | 'pink';

const PanelContext = createContext<Theme>('white');

export const usePanelContext = () => {
  const theme = useContext(PanelContext);
  return useMemo(
    () => ({
      colorCls: classNames({
        // 'color-white': theme === 'black' || theme === 'green',
        'bg-white text-red-500 border-red-500': theme === 'red',
        'bg-orange-100 text-orange-800 border-orange-800': theme === 'beige',
        'bg-emerald-500 text-black border-black': theme === 'green',
        'bg-black text-white border-white': theme === 'black',
        'bg-white text-black border-black': theme === 'white',
        'bg-cyan-100 text-blue-700 border-blue-700': theme === 'blue',
        'bg-pink-500 text-pink-100 border-pink-100': theme === 'pink',
      }),
      theme,
    }),
    [theme],
  );
};

export const PanelContextProvider = PanelContext.Provider;

export const PanelContextConsumer = memo<{ children: (theme: { colorCls: string; theme: Theme }) => JSX.Element }>(
  ({ children }) => {
    const theme = usePanelContext();
    return children(theme);
  },
);
