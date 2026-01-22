'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const [completed, setCompleted] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Check if already completed today based on 'dailyWalkHistory'
    const today = new Date().toDateString();

    // Migration/check for history
    const historyJSON = localStorage.getItem('dailyWalkHistory');
    let history: string[] = historyJSON ? JSON.parse(historyJSON) : [];

    // Backwards compatibility check
    const oldSaved = localStorage.getItem('dailyWalkCompleted');
    if (oldSaved && !history.includes(oldSaved)) {
      history.push(oldSaved);
      localStorage.setItem('dailyWalkHistory', JSON.stringify(history));
    }

    if (history.includes(today)) {
      setCompleted(true);
    }

    const timer = setTimeout(() => setShowButton(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    setCompleted(true);
    const today = new Date().toDateString();

    const historyJSON = localStorage.getItem('dailyWalkHistory');
    let history: string[] = historyJSON ? JSON.parse(historyJSON) : [];

    if (!history.includes(today)) {
      history.push(today);
      localStorage.setItem('dailyWalkHistory', JSON.stringify(history));
    }
    // Keep simple key for easy check elsewhere if needed, but history is source of truth now
    localStorage.setItem('dailyWalkCompleted', today);
  };

  return (
    <div className="flex flex-col justify-center flex-1 py-10 gap-8">
      <header className="space-y-4">
        <div className="space-y-2">
          <p className="text-gray-500 text-sm uppercase tracking-widest font-medium">{date}</p>
          <h1 className="text-4xl font-serif text-[var(--foreground)] tracking-tight">A Quiet Heart</h1>
        </div>

        <div className="text-center text-gray-400 text-sm italic font-medium animate-pulse">
          Inhale slowly. Exhale gently.
        </div>
      </header>

      <div className="bg-[#fcfbf9] p-6 rounded-2xl border border-[#f0f0f0] space-y-3">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Scripture Reference</p>
        <div className="space-y-1">
          <p className="font-serif text-lg text-[var(--foreground)]">Psalm 46:10</p>
          <p className="text-gray-600 italic leading-relaxed">“Be still, and know that I am God.”</p>
        </div>
      </div>

      <section className="space-y-6 text-lg leading-relaxed text-gray-700">
        <p>
          In the rush of the morning, it is easy to forget the peace that is available to us.
          Take a moment to breathe. The world can wait.
          Your soul needs this silence more than your schedule needs your anxiety.
        </p>
      </section>

      <div className="pt-8 space-y-4 min-h-[120px]">
        {!completed ? (
          <div className={`transition-opacity duration-1000 ${showButton ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={handleComplete}
              className="w-full py-4 rounded-2xl bg-[#f0eee6] hover:bg-[#e8e6de] text-[var(--foreground)] font-medium transition-all active:scale-95 duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d6d4ce]"
              aria-label="Receive this devotion"
            >
              I receive this word
            </button>
          </div>
        ) : (
          <div className="w-full py-4 rounded-2xl bg-[#fcfbf9] border border-[#e0ded6] text-center animate-fade-in" role="status">
            <p className="text-[var(--foreground)] font-medium">May peace walk with you today.</p>
          </div>
        )}
      </div>

      <footer className="mt-auto pt-10 text-center space-y-8 transition-opacity duration-700">
        <Link href="/reflections" className="text-sm font-medium text-[#222222] hover:text-black transition-colors border-b border-gray-300 hover:border-gray-500 pb-0.5">
          Revisit past reflections
        </Link>
        <p className="text-sm font-serif italic text-gray-500 opacity-40 hover:opacity-100 transition-opacity">"Be still, and know." — Psalm 46:10</p>
      </footer>
    </div>
  );
}
