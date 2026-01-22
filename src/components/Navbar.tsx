'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav className="w-full py-6 px-4 flex justify-between items-center max-w-md mx-auto">
      <Link href="/" className="text-xl font-medium tracking-tight hover:opacity-70 transition-opacity">
        Daily Walk
      </Link>
      <div className="flex gap-4 text-sm font-medium">
        <Link href="/" className={`transition-colors ${isActive('/') ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}>
          Devotion
        </Link>
        <Link href="/progress" className={`transition-colors ${isActive('/progress') ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}>
          Progress
        </Link>
      </div>
    </nav>
  );
}
