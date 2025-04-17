// app/components/CountdownTimer.jsx
'use client';

import { useEffect, useState } from 'react';

export default function CountdownTimer({ targetDate }) {
    const [timeLeft, setTimeLeft] = useState({ months: 0, weeks: 0, days: 0, hours: 0 });

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const target = new Date(targetDate);
            const diff = target.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeLeft({ months: 0, weeks: 0, days: 0, hours: 0 });
                return;
            }

            const msInHour = 1000 * 60 * 60;
            const msInDay = msInHour * 24;
            const msInWeek = msInDay * 7;
            const msInMonth = msInDay * 30;

            const months = Math.floor(diff / msInMonth);
            const weeks = Math.floor((diff % msInMonth) / msInWeek);
            const days = Math.floor((diff % msInWeek) / msInDay);
            const hours = Math.floor((diff % msInDay) / msInHour);

            setTimeLeft({ months, weeks, days, hours });
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000 * 60 * 15); // Atualiza a cada 15 minutos

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="fixed top-0 w-full py-3 px-4 bg-black/30 text-neutral-50 text-sm xs:text-base sm:text-lg md:text-xl font-medium flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 z-50 backdrop-blur-md h-[50px]">
            <span>{String(timeLeft.months).padStart(2, '0')} Mes{timeLeft.months !== 1 && 'es'}</span>
            <span>{String(timeLeft.weeks).padStart(2, '0')} Semana{timeLeft.weeks !== 1 && 's'}</span>
            <span>{String(timeLeft.days).padStart(2, '0')} Dia{timeLeft.days !== 1 && 's'}</span>
            <span>{String(timeLeft.hours).padStart(2, '0')} Hora{timeLeft.hours !== 1 && 's'}</span>
        </div>
    );
}
