'use client';

import classNames from 'classnames';
import { ReactNode, memo } from 'react';
import { PanelPopupTitle } from './panel-popup.component';
import { PanelContextConsumer, PanelContextProvider } from './panel.context';

export type Theme = 'red' | 'beige' | 'green' | 'black' | 'white' | 'blue' | 'pink' | 'yellow' | 'orange';

export const Panel = memo<{
  children: ReactNode;
  theme: Theme;
  label: ReactNode;
  id?: string;
  full?: boolean;
  sticky?: { rtl?: boolean; children: ReactNode };
}>(({ id, children, theme, label, sticky, full }) => (
  <PanelContextProvider value={theme}>
    <PanelContextConsumer>
      {({ colorCls }) => {
        return (
          <section className={classNames({ 'p-4 relative': full }, colorCls)} id={id}>
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
              <PanelPopupTitle label={label}>
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
        )
      }}
    </PanelContextConsumer>
  </PanelContextProvider>
));
