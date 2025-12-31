import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8">
      <h1 className="text-4xl md:text-6xl font-bold mb-12 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500">
        Legacy Hardware
      </h1>
      
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-2xl justify-center">
        <Link 
          href="/ps1"
          className="group relative px-8 py-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 flex flex-col items-center gap-4 w-full"
        >
          <span className="text-2xl font-bold text-neutral-200 group-hover:text-white">PlayStation 1</span>
          <span className="text-sm text-neutral-500 group-hover:text-neutral-300">Sony Computer Entertainment</span>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        <Link 
          href="/ibmpc"
          className="group relative px-8 py-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 flex flex-col items-center gap-4 w-full"
        >
          <span className="text-2xl font-bold text-neutral-200 group-hover:text-white">IBM PC XT 5150</span>
          <span className="text-sm text-neutral-500 group-hover:text-neutral-300">International Business Machines</span>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
      </div>
    </div>
  );
}
