'use client';

import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, memo, useState } from 'react';
import { createPortal } from 'react-dom';

export type Theme = 'red' | 'beige' | 'green' | 'black' | 'white';

export const PanelPopup = memo<{
  children: ReactNode;
  label: ReactNode;
  className: string;
  close(): void;
  show?: boolean;
}>(({ children, className, label, close, show = false }) => {
  return createPortal(
    <motion.section
      variants={{ show: { opacity: 1 }, hide: { opacity: 0 } }}
      initial="hide"
      animate={show ? 'show' : 'hide'}
      exit="hide"
      className={classNames('backdrop-blur-sm bg-black/50 fixed inset-0 z-50 flex flex-col overflow-auto', {
        'pointer-events-none': !show,
      })}
    >
      <div onClick={close} className=" min-h-[4rem] w-full cursor-pointer flex flex-grow"></div>
      <motion.div
        variants={{ show: { y: 0 }, hide: { y: 32 } }}
        initial="hide"
        animate={show ? 'show' : 'hide'}
        exit="hide"
        className={classNames(className, 'flex w-full flex-col p-4')}
      >
        <h2 className="type-headline-2 mb-4 border-b-2 border-inherit">{label}</h2>
        {children}
      </motion.div>
    </motion.section>,
    document.body,
  );
});

export const PanelPopupTitle = memo<{
  label: ReactNode;
  children: ReactNode;
  colorCls: string;
}>(({ children, label, colorCls }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="cursor-pointer relative h-7 w-full group" onClick={() => setOpen(true)}>
        <h2
          className={classNames(
            'absolute bottom-0 type-headline-2 uppercase h-7 group-hover:h-12 transition-all overflow-hidden px-2 w-full',
            colorCls,
          )}
        >
          {label}
        </h2>
      </div>
      <AnimatePresence>
        <PanelPopup label={label} close={() => setOpen(false)} className={colorCls} show={open}>
          {children}
        </PanelPopup>
      </AnimatePresence>
    </>
  );
});
