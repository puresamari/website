'use client';

import classNames from 'classnames';
import { motion } from 'framer-motion';
import { PropsWithChildren, memo, useEffect, useMemo, useRef, useState } from 'react';

export const Collapsible = memo<PropsWithChildren<{ className?: string; collapsedHeight?: number }>>(
  ({ children, className, collapsedHeight = 100 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [enabled, setEnabled] = useState(true);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!ref.current) return;
      setEnabled(collapsedHeight < ref.current.getBoundingClientRect().height);
    }, [ref.current]);

    const collapsed = useMemo(() => enabled && !isOpen, [enabled, isOpen]);

    return (
      <div className={classNames(className, 'relative overflow-hidden')}>
        <motion.div
          initial={false}
          animate={!collapsed ? 'open' : 'closed'}
          variants={{
            open: { height: 'auto' },
            closed: { height: collapsedHeight },
          }}
        >
          <div ref={ref}>{children}</div>
        </motion.div>
        {collapsed && (
          <button
            className="absolute bottom-0 w-full text-center bg-black bg-opacity-50 type-body-3 p-2 hover:bg-opacity-20"
            onClick={() => setIsOpen(true)}
          >
            Expand
          </button>
        )}
      </div>
    );
  },
);
