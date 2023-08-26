import { ReadonlyURLSearchParams } from 'next/navigation';
import { MouseEvent } from 'react';

export const calculatePopupPosition = (evt: MouseEvent) => {
    const target = evt.target as HTMLElement;
    const divWidth = target.offsetWidth;
    const divHeight = target.offsetHeight;
    const screenWidth = window.innerWidth;
    let chevron: 'left' | 'right' = 'left';
    let x = target.getBoundingClientRect().x + divWidth;
    let y = target.getBoundingClientRect().y + divHeight / 2;
    const popupWidth = document.getElementById('popup')?.clientWidth;

    if (x + popupWidth! > screenWidth) {
        x -= popupWidth!;
        chevron = 'right';
    } else {
        x -= divWidth!;
    }
    y += 10;
    return { x, y, chevron };
};

export const appointmentFormatDate = (date: Date) => {
    const dateFormat = new Date(date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });
    const timeFormat = new Date(date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    return `${dateFormat} - ${timeFormat}`;
};

export const formatDate = (date: Date) => {
    const dateFormat = new Date(date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });
    return dateFormat;
};

export const debounce = (func: Function, delay: number) => {
    let timer: any;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

export const wait = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const onFilter = ({
    paramsEntries,
    value,
    params
}: {
    paramsEntries: IterableIterator<[string, string]>;
    value: string;
    params: string;
}) => {
    const current = new URLSearchParams(Array.from(paramsEntries));

    if (!value) {
        current.delete(params);
    } else {
        current.set(params, value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';
    return query;
};

export const isProjectPage = (path: string, searchParams: ReadonlyURLSearchParams) => {
    return path.includes('projects') && searchParams.get('id');
};