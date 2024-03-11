'use client';

import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, createContext, memo, useContext, useEffect, useId, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePanelContext } from './panel.context';

const Title = memo<{ children: ReactNode; onClick?(): void }>(({ children, onClick }) => {
  const { colorCls } = usePanelContext();
  return (
    <div
      className={classNames('relative w-full group', { 'cursor-pointer h-7 ': !!onClick }, colorCls)}
      onClick={onClick}
    >
      <h2
        className={classNames(
          'type-headline-2 uppercase overflow-hidden px-2 w-full',
          { 'absolute bottom-0 transition-all cursor-pointer h-7 group-hover:h-12': !!onClick, 'h-12': !onClick },
          colorCls,
        )}
      >
        {children}
      </h2>
    </div>
  );
});

export const PanelPopup = memo<{
  children: ReactNode;
  label: ReactNode;
  close(): void;
  show?: boolean;
}>(({ children, label, close, show = false }) => {
  const { colorCls } = usePanelContext();
  const [mounted, setMounted] = useState(false);
  const id = useId();

  useEffect(() => {
    setMounted(typeof window !== 'undefined');
  }, [show, colorCls]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.section
          key="id"
          variants={{ show: { opacity: 1 }, hide: { opacity: 0 } }}
          initial="hide"
          animate="show"
          exit="hide"
          className={classNames('backdrop-blur-sm bg-black/50 fixed inset-0 z-50 flex flex-col overflow-auto', {
            'pointer-events-none': !show,
          })}
        >
          <div onClick={close} className=" min-h-[4rem] w-full cursor-pointer flex flex-grow"></div>
          <motion.div
            variants={{ show: { y: 0 }, hide: { y: 32 } }}
            initial="hide"
            animate="show"
            exit="hide"
            className={classNames(colorCls, 'flex w-full flex-col p-4')}
          >
            <div className="sticky top-0 z-10 border-b-2 mb-2">
              <Title>{label}</Title>
            </div>
            {children}
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>,
    document.body,
  );
});

export const PanelPopupTitle = memo<{
  label: ReactNode;
  children: ReactNode;
}>(({ children, label }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Title onClick={() => setOpen(true)}>{label}</Title>
      <AnimatePresence>
        <PanelPopup label={label} close={() => setOpen(false)} show={open}>
          {children}
        </PanelPopup>
      </AnimatePresence>
    </>
  );
});
