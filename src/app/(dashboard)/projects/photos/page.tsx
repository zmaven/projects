'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { PhotoIcon } from '@/public/icons';
import { SuspenseSpinner } from '@/components/shared/progress';
import { PhotosSelectionBox } from '@/components/features/projects/photos';
import { FallbackEmpty, FallbackError } from '@/components/shared/fallbacks';
import { usePhotos } from '@/swrApi/photos';

const Page = () => {
    const photosRef = useRef<HTMLDivElement | null>(null);
    const { photos, error, isLoading } = usePhotos();

    const handleActive = (isActive: boolean | undefined) => {
        if (isActive) {
            return 'outline outline-4 outline-[#0B5697]';
        }
        return '';
    };

    return (
        <>
            {isLoading && <SuspenseSpinner />}
            {error && <FallbackError content="Something went wrong!" />}
            {photos?.length > 0 ? (
                <PhotosSelectionBox>
                    <div
                        ref={photosRef}
                        className="
                            flex flex-wrap items-start place-content-start gap-[10px] pl-[7px] drag py-[10px]
                            pointer-events-none
                        "
                    >
                        {photos.map((item: Photos) => (
                            <div
                                key={item.id}
                                title={item.id}
                                className={twMerge(
                                    `relative w-[90px] h-[120px] flex items-center justify-center rounded-[8px]`,
                                    `${handleActive(item.active)}`
                                )}
                            >
                                <Image
                                    fill
                                    priority
                                    alt="photo"
                                    sizes="100"
                                    src={item.link}
                                    className="rounded-[8px] object-cover select-none"
                                />
                            </div>
                        ))}
                    </div>
                </PhotosSelectionBox>
            ) : (
                <FallbackEmpty
                    icon={<PhotoIcon className="w-[50px] h-[50px]" />}
                    content="List is currently empty."
                />
            )}
        </>
    );
};

export default Page;
