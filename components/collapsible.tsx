'use client';

import classNames from 'classnames';
import { motion } from 'framer-motion';
import { PropsWithChildren, memo, useState } from 'react';

const variants = {
  open: { maxHeight: 'auto' },
  closed: { maxHeight: 100 },
};

export const Collapsible = memo<PropsWithChildren<{ className?: string }>>(({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={classNames(className, 'relative overflow-hidden')}>
      <motion.div initial={false} animate={isOpen ? 'open' : 'closed'} variants={variants}>
        {children}
      </motion.div>
      {!isOpen && (
        <button
          className="absolute bottom-0 w-full text-center bg-black bg-opacity-50 type-body-3 p-2 hover:bg-opacity-20"
          onClick={() => setIsOpen(true)}
        >
          Expand
        </button>
      )}
    </div>
  );
});
