'use client';

import { CropCornerIcon } from '@/public/icons';
import { MouseEvent, useRef, useState } from 'react';

const Page = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cropRef = useRef<HTMLDivElement | null>(null);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [endX, setEndX] = useState(550);
    const [endY, setEndY] = useState(800);
    const [position, setPosition] = useState('');
    const [isSelecting, setIsSelecting] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (pos: string) => {
        setIsSelecting(true);
        setPosition(pos);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (isSelecting) {
            const parent = containerRef.current?.getBoundingClientRect();

            const newStartX = e.clientX - parent?.left!;
            const newStartY = e.clientY - parent?.top!;
            const newEndX = e.clientX - parent?.left!;
            const newEndY = e.clientY - parent?.top!;

            if (
                position === 'tl' &&
                newStartX >= 0 &&
                newStartY >= 0 &&
                newStartX <= parent?.width! &&
                newStartY <= parent?.height!
            ) {
                setStartX(newStartX);
                setStartY(newStartY);
            } else if (
                position === 'br' &&
                newEndX >= 0 &&
                newEndY >= 0 &&
                newEndX <= parent?.width! &&
                newEndY <= parent?.height!
            ) {
                setEndX(newEndX);
                setEndY(newEndY);
            } else if (
                position === 'tr' &&
                newStartY >= 0 &&
                newEndX >= 0 &&
                newStartY <= parent?.height! &&
                newEndX <= parent?.width!
            ) {
                setStartY(newStartY);
                setEndX(newEndX);
            } else if (
                position === 'bl' &&
                newStartX >= 0 &&
                newEndY >= 0 &&
                newStartX <= parent?.width! &&
                newEndY <= parent?.height!
            ) {
                setStartX(newStartX);
                setEndY(newEndY);
            }
        }
    };

    const handleDragging = (e: MouseEvent) => {
        // if (!isDragging) return;
        // const parent = containerRef.current?.getBoundingClientRect();
        // const newPosition = {
        //     x: e.clientX - parent?.left!,
        //     y: e.clientY - parent?.top!
        // };
        // setStartX(newPosition.x);
        // setStartY(newPosition.y);
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
    };

    return (
        <div
            className="w-full h-full flex items-start justify-center overflow-y-auto"
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            <div
                ref={containerRef}
                className="relative w-[550px] h-[800px] bg-red-400"
            >
                <div
                    ref={cropRef}
                    className="absolute bg-[#6C98E233] border-2 border-[#0B5697] select-none z-[1] inset-0"
                    style={{
                        left: Math.min(startX, endX),
                        top: Math.min(startY, endY),
                        width: Math.abs(endX - startX),
                        height: Math.abs(endY - startY)
                    }}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onMouseMove={handleDragging}
                >
                    <div className="w-full h-full bg-blue-400 relative">
                        <CropCornerIcon
                            onMouseDown={() => handleMouseDown('tl')}
                            className="h-[20px] w-[20px] absolute left-0 top-0 cursor-nw-resize ml-[-3px] mt-[-3px]"
                        />
                        <CropCornerIcon
                            onMouseDown={() => handleMouseDown('tr')}
                            className="
                                h-[20px] w-[20px] absolute right-0 top-0 cursor-ne-resize mr-[-3px] mt-[-3px] rotate-90"
                        />
                        <CropCornerIcon
                            onMouseDown={() => handleMouseDown('bl')}
                            className="
                                h-[20px] w-[20px] absolute left-0 bottom-0 cursor-sw-resize ml-[-3px] mb-[-3px]
                                -rotate-90"
                        />
                        <CropCornerIcon
                            onMouseDown={() => handleMouseDown('br')}
                            className="
                                h-[20px] w-[20px] absolute right-0 bottom-0 cursor-se-resize mr-[-3px] mb-[-3px]
                                rotate-180"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
