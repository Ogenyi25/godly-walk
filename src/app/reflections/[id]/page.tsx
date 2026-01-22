import Link from 'next/link';
import { devotions } from '@/lib/devotions'; // Adjust import path if needed

// Generate static params for all known devotions to enable static export if needed/optimization
export async function generateStaticParams() {
    return devotions.map((devotion) => ({
        id: devotion.id,
    }));
}

export default async function ReflectionPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const devotion = devotions.find((d) => d.id === id);

    if (!devotion) {
        return (
            <div className="flex flex-col items-center justify-center flex-1 py-10 gap-4">
                <p className="text-gray-500">Reflection not found.</p>
                <Link href="/reflections" className="text-sm font-medium text-[var(--foreground)] underline decoration-gray-300 underline-offset-4">Return to index</Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center flex-1 py-10 gap-8 animate-fade-in">
            <header className="space-y-2">
                <p className="text-gray-500 text-sm uppercase tracking-widest font-medium">{devotion.date}</p>
                <h1 className="text-4xl font-serif text-[var(--foreground)] tracking-tight">{devotion.title}</h1>
            </header>

            <section className="bg-[#fcfbf9] p-6 rounded-2xl border border-[#f0f0f0] space-y-3">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Scripture Reference</p>
                <div className="space-y-1">
                    <p className="font-serif text-lg text-[var(--foreground)]">{devotion.scriptureRef}</p>
                    <p className="text-gray-600 italic leading-relaxed">“{devotion.scriptureText}”</p>
                </div>
            </section>

            <section className="space-y-6 text-lg leading-relaxed text-gray-700">
                {devotion.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                ))}
            </section>

            <div className="mt-auto pt-10 text-center space-y-6">
                <p className="text-sm font-serif italic text-gray-500">
                    {devotion.summary}
                </p>
                <div>
                    <Link href="/reflections" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Return to past reflections</Link>
                </div>
            </div>
        </div>
    );
}
