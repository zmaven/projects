'use client';

import { twMerge } from 'tailwind-merge';
import React, { HTMLAttributes, useEffect, useState } from 'react';

function CustomSvg({
    svgIconUrl,
    className,
    ...props
}: {
    svgIconUrl: string;
    className?: string;
} & HTMLAttributes<HTMLDivElement>) {
    const [svgContent, setSvgContent] = useState<any>(null);

    useEffect(() => {
        async function fetchSvgIcon() {
            const response = await fetch(svgIconUrl);
            const svgText: any = await response.text();
            setSvgContent(svgText);
        }
        fetchSvgIcon();
    }, []);

    return (
        <>
            {svgContent && (
                <div
                    className={twMerge('cursor-pointer', className)}
                    dangerouslySetInnerHTML={{
                        __html: svgContent
                            ? svgContent
                                  .replaceAll(
                                      /fill="#[^"]+"/g,
                                      'fill="currentColor"'
                                  )
                                  .replaceAll(
                                      /stroke="#[^"]+"/g,
                                      'stroke="currentColor"'
                                  ) // Replace fill color
                            : ''
                    }}
                    {...props}
                />
            )}
        </>
    );
}

export default CustomSvg;
