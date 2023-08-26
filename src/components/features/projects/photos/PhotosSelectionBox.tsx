'use client';

import {
    useRef,
    useState,
    DragEvent,
    ReactNode,
    useEffect,
    MouseEvent
} from 'react';
import { useDispatch } from 'react-redux';
import { setUploadMinimize, setShowUploadModal } from '@/redux/reducers/photo';
import { usePhotos } from '@/swrApi/photos';

const PhotosSelectionBox = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch();
    const boxRef = useRef<HTMLDivElement | null>(null);
    const highlightRef = useRef<HTMLDivElement | null>(null);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [endX, setEndX] = useState(0);
    const [endY, setEndY] = useState(0);
    const [didLeave, setDidLeave] = useState(true);
    const [isMultiple, setIsMultiple] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false);

    const { mutate } = usePhotos();

    const handlePhotoSelection = () => {
        const photosRef = boxRef.current?.lastElementChild as HTMLDivElement;
        const absoluteRect = highlightRef.current?.getBoundingClientRect();

        const photoElements = Array.from(
            photosRef.children
        ) as HTMLDivElement[];

        for (const photoElement of photoElements) {
            const otherRect = photoElement.getBoundingClientRect();

            const isOverlap =
                absoluteRect!.right >= otherRect.left &&
                absoluteRect!.left <= otherRect.right &&
                absoluteRect!.bottom >= otherRect.top &&
                absoluteRect!.top <= otherRect.bottom;
            if (isOverlap) {
                mutate((prevData: Photos[] | undefined) => {
                    return prevData?.map((item: Photos) =>
                        item.id === photoElement.title
                            ? {
                                  ...item,
                                  active: !item.active
                              }
                            : {
                                  ...item,
                                  active: isMultiple ? item.active : false
                              }
                    );
                }, false);
            }
        }
    };

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        setIsSelecting(true);
        setStartX(e.clientX);
        setStartY(e.clientY);
        setEndX(e.clientX);
        setEndY(e.clientY);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (isSelecting) {
            setEndX(e.clientX);
            setEndY(e.clientY);
        }
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
        handlePhotoSelection();
    };

    const onKeyDown = (evt: globalThis.KeyboardEvent) => {
        const { code } = evt;
        if (code === 'ShiftLeft' || code === 'ShiftRight') {
            setIsMultiple(true);
        } else if (code === 'ControlLeft' || code === 'ControlRight') {
            setIsMultiple(true);
        } else if (code === 'MetaLeft' || code === 'MetaRight') {
            setIsMultiple(true);
        } else if (code === 'Escape') {
            dispatch(setShowUploadModal(false));
        }
    };

    const onKeyUp = (_: globalThis.KeyboardEvent) => {
        setIsMultiple(false);
    };

    const activateEventKeys = () => {
        addEventListener('keydown', onKeyDown);
        addEventListener('keyup', onKeyUp);
    };

    const removeEventKeys = () => {
        removeEventListener('keydown', onKeyDown);
        removeEventListener('keyup', onKeyUp);
    };

    const handleDragEnter = (evt: DragEvent<HTMLDivElement>) => {
        evt.preventDefault();
        evt.stopPropagation();
        if (didLeave) {
            dispatch(setShowUploadModal(true));
            dispatch(setUploadMinimize(false));
            setDidLeave(false);
        }
    };

    const handleDragLeave = (evt: DragEvent<HTMLDivElement>) => {
        evt.preventDefault();
        evt.stopPropagation();
        setDidLeave(true);
    };

    useEffect(() => {
        activateEventKeys();
        return () => {
            removeEventKeys();
        };
    }, []);

    return (
        <div
            ref={boxRef}
            className="w-full h-full overflow-y-auto z-[100]"
            onMouseUp={handleMouseUp}
            onDragOver={handleDragEnter}
            onDragExit={handleDragLeave}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            {isSelecting && (
                <div
                    ref={highlightRef}
                    className="absolute bg-[#6C98E233] border-2 border-[#0B5697] select-none z-[1]"
                    style={{
                        left: Math.min(startX, endX),
                        top: Math.min(startY, endY),
                        width: Math.abs(endX - startX),
                        height: Math.abs(endY - startY)
                    }}
                />
            )}
            {children}
        </div>
    );
};

export default PhotosSelectionBox;
