'use client';

import { useState } from 'react';
import Link from 'next/link';
import { devotions } from '@/lib/devotions';

export default function ReflectionsPage() {
    const [filterDate, setFilterDate] = useState('');

    const filteredDevotions = devotions.filter(devotion =>
        devotion.date.toLowerCase().includes(filterDate.toLowerCase())
    );

    return (
        <div className="flex flex-col flex-1 py-10 gap-8 animate-fade-in">
            <header className="space-y-4">
                <h1 className="text-3xl font-serif text-[var(--foreground)] tracking-tight">Past Reflections</h1>
                <div className="space-y-1 text-gray-500 text-sm leading-relaxed">
                    <p>This is a quiet record of words you’ve already encountered.</p>
                    <p>You may return to any reflection when you feel led to — there is no rush.</p>
                </div>
            </header>

            <div className="space-y-2">
                <label htmlFor="date-filter" className="text-xs font-medium uppercase tracking-wider text-gray-400">Find by date</label>
                <input
                    id="date-filter"
                    type="text"
                    placeholder="Choose a day..."
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#fcfbf9] border border-[#e0ded6] text-[var(--foreground)] placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#d6d4ce] transition-shadow"
                />
                <p className="text-xs text-gray-300">Choose a day you’d like to return to.</p>
            </div>

            <div className="space-y-6">
                {filteredDevotions.length > 0 ? (
                    filteredDevotions.map(devotion => (
                        <article key={devotion.id} className="bg-white p-6 rounded-2xl border border-[#f0f0f0] shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4">
                            <div className="space-y-1">
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">{devotion.date}</p>
                                <h2 className="text-xl font-serif text-[var(--foreground)]">{devotion.title}</h2>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-500">{devotion.scriptureRef}</p>
                                <p className="text-sm text-gray-600 italic">“{devotion.summary}”</p>
                            </div>

                            <div className="pt-2">
                                <Link href={`/reflections/${devotion.id}`} className="text-sm font-medium text-[#8c8a82] hover:text-[var(--foreground)] transition-colors inline-flex items-center gap-1 group">
                                    Return to this reflection
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                </Link>
                            </div>
                        </article>
                    ))
                ) : (
                    <p className="text-center text-gray-400 py-8 italic">No reflections found for this date.</p>
                )}
            </div>

            <div className="mt-auto pt-8 text-center">
                <Link href="/" className="text-xs text-gray-300 hover:text-gray-500 transition-colors">Return Home</Link>
            </div>
        </div>
    );
}
