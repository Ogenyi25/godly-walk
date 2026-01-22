'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProgressPage() {
    const [todayCompleted, setTodayCompleted] = useState(false);
    const [history, setHistory] = useState<string[]>([]);
    const [weekData, setWeekData] = useState<{ day: string, status: string, date: string }[]>([]);
    const [stats, setStats] = useState({ daysOfPeace: 0, consistency: 0 });

    useEffect(() => {
        const today = new Date().toDateString();

        // Load history
        const historyJSON = localStorage.getItem('dailyWalkHistory');
        let loadedHistory: string[] = historyJSON ? JSON.parse(historyJSON) : [];

        // Backwards compatibility
        const oldSaved = localStorage.getItem('dailyWalkCompleted');
        if (oldSaved && !loadedHistory.includes(oldSaved)) {
            loadedHistory.push(oldSaved);
        }

        setHistory(loadedHistory);

        if (loadedHistory.includes(today) || oldSaved === today) {
            setTodayCompleted(true);
        }

        // Calculate Weekly Rhythm (Last 7 days ending today)
        const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        const calculatedWeekData = [];
        const todayDate = new Date();

        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(todayDate.getDate() - i);
            const dateStr = d.toDateString();
            const dayLabel = days[d.getDay()];

            let status = 'pending';
            if (dateStr === today) {
                status = 'current'; // Today is special
                if (loadedHistory.includes(dateStr)) status = 'complete';
            } else if (loadedHistory.includes(dateStr)) {
                status = 'complete';
            }

            calculatedWeekData.push({ day: dayLabel, status, date: dateStr });
        }

        setWeekData(calculatedWeekData);

        // Calculate Stats
        const daysOfPeace = loadedHistory.length;
        const weekCompletedCount = calculatedWeekData.filter(d => d.status === 'complete').length;
        // Simple logic for MVP consistency: current week success rate or just default high to be encouraging
        const consistency = Math.round((weekCompletedCount / 7) * 100) || 100;

        setStats({ daysOfPeace, consistency });

    }, []);

    const hasActivity = history.length > 0;

    return (
        <div className="flex flex-col justify-center flex-1 py-10 gap-8 animate-fade-in">
            <header className="space-y-4">
                <div className="space-y-2">
                    <h1 className="text-3xl font-serif text-[var(--foreground)] tracking-tight">Your Journey</h1>
                    <p className="text-gray-500">Each day is a new beginning.</p>
                </div>
            </header>

            {/* Today's Walk Section */}
            <section className="bg-white p-6 rounded-2xl border border-[#f0f0f0] shadow-sm space-y-3">
                <h2 className="text-sm font-medium uppercase tracking-wider text-gray-400">Today&apos;s Walk</h2>
                {!todayCompleted ? (
                    <div className="space-y-2">
                        <p className="text-lg font-serif text-[var(--foreground)]">Your reflection for today is waiting.</p>
                        <Link href="/" className="inline-flex items-center text-sm font-medium text-[#8c8a82] hover:text-[var(--foreground)] transition-colors">
                            Begin today&apos;s devotion →
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-start gap-4">
                        <div className="mt-1 h-6 w-6 rounded-full bg-[#f0eee6] flex items-center justify-center text-[#8c8a82]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="space-y-1">
                            <p className="text-lg font-serif text-[var(--foreground)]">You&apos;ve taken today&apos;s step.</p>
                            <p className="text-sm text-gray-500">The next reflection will be available tomorrow. Rest is part of the journey.</p>
                        </div>
                    </div>
                )}
            </section>

            {hasActivity ? (
                <>
                    <div className="flex gap-4">
                        <div className="flex-1 bg-[#fcfbf9] p-4 rounded-2xl border border-[#f0f0f0] flex flex-col items-center justify-center gap-1">
                            <span className="text-3xl font-serif text-[var(--foreground)]">{stats.daysOfPeace}</span>
                            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Days of Peace</span>
                        </div>
                        <div className="flex-1 bg-[#fcfbf9] p-4 rounded-2xl border border-[#f0f0f0] flex flex-col items-center justify-center gap-1">
                            <span className="text-3xl font-serif text-[var(--foreground)]">{stats.consistency}%</span>
                            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Consistency</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-900 ml-1">Weekly Rhythm</h3>
                        <div className="grid grid-cols-7 gap-2">
                            {weekData.map((d, i) => (
                                <div key={i} className={`
                 aspect-square rounded-full flex items-center justify-center text-sm font-medium transition-all
                 ${d.status === 'complete' ? 'bg-[#e0ded6] text-gray-800' : ''}
                 ${d.status === 'current' ? 'border-2 border-[#e0ded6] text-gray-800' : ''}
                 ${d.status === 'pending' ? 'text-gray-300' : ''}
               `}>
                                    {d.day}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 bg-[#fcfbf9] rounded-3xl border-2 border-dashed border-[#e6e4dc]">
                    <div className="h-12 w-12 rounded-full bg-[#f0eee6] flex items-center justify-center text-[#d6d4ce]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>
                    <div className="space-y-1">
                        <p className="text-lg font-medium text-gray-600">Start Your Journey</p>
                        <p className="text-gray-400 max-w-[200px] mx-auto">Every journey begins with a single step of peace.</p>
                    </div>
                </div>
            )}

            <div className="mt-auto pt-4 text-center">
                <Link href="/reflections" className="text-xs text-gray-400 hover:text-gray-600 transition-colors border-b border-transparent hover:border-gray-300 pb-0.5">
                    View past reflections
                </Link>
            </div>
        </div>
    );
}
