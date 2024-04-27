'use client'

import formatTime from '@/functions/time/formatTime';
import React, { useEffect, useState } from 'react'

interface ITimer {
    start: boolean;
    finish: boolean;
}

export default function Timer({ start, finish }: ITimer) {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (start && !finish) {
            interval = setInterval(() => {
                setTimer((time) => time + 1);
            }, 1000);
        } else {
            if (interval) clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        }
    }, [start, finish])

    return (
        <>
            {formatTime(timer)}
        </>
    )
}
