import React from 'react';

/*
| Tailwind Class | 실제 크기 (기본 기준)   | 설명     |
| -------------- | --------------- | ------ |
| `text-xs`      | 0.75rem (12px)  | 매우 작음  |
| `text-sm`      | 0.875rem (14px) | 작음     |
| `text-base`    | 1rem (16px)     | 기본 크기  |
| `text-lg`      | 1.125rem (18px) | 약간 큼   |
| `text-xl`      | 1.25rem (20px)  | 큼      |
| `text-2xl`     | 1.5rem (24px)   | 더 큼    |
| `text-3xl`     | 1.875rem (30px) | 꽤 큼    |
| `text-4xl`     | 2.25rem (36px)  | 매우 큼   |
| `text-5xl`     | 3rem (48px)     | 타이틀 수준 |
| `text-6xl`     | 3.75rem (60px)  |        |
| `text-7xl`     | 4.5rem (72px)   |        |
| `text-8xl`     | 6rem (96px)     |        |
| `text-9xl`     | 8rem (128px)    |        |
*/

export function CommonText({ children, fontSize = 'text-base', bold = false, multiline = false, className = '' }) {
    return (
        <p
            className={`font-sans ${fontSize} ${bold ? 'font-bold' : 'font-normal'} ${
                multiline ? 'whitespace-normal break-words' : 'whitespace-nowrap overflow-hidden text-ellipsis'
            } ${className}`}
        >
            {children}
        </p>
    );
}
