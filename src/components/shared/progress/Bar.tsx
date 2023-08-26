'use client';

import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';
import { AnimatePresence, motion } from 'framer-motion';
import { setStartFetchLoading } from '@/redux/reducers/app';
import { usePathname, useSearchParams } from 'next/navigation';

const Bar = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [finish, setFinish] = useState(false);
    const { startFetchLoading } = useAppSelector((state) => state.app);

    useEffect(() => {
        dispatch(setStartFetchLoading(false));
    }, [pathname, searchParams]);

    useEffect(() => {
        if (startFetchLoading) {
            setFinish(true);
        }
    }, [startFetchLoading]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (finish) {
                setFinish(false);
            }
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, [finish]);

    return (
        <AnimatePresence>
            {(startFetchLoading || finish) && (
                <div className="absolute top-0 w-full h-[4px]">
                    <motion.div
                        initial={{ width: 0 }}
                        transition={{ duration: 0.3 }}
                        animate={{ width: startFetchLoading ? '70%' : '100%' }}
                        className="bg-primary h-[4px]"
                    />
                </div>
            )}
        </AnimatePresence>
    );
};

export default Bar;
