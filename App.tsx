
import React, { useState } from 'react';
import FloatingCat from './components/FloatingCat';
import BentoCard from './components/BentoCard';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Component for the wind chime to keep main render clean
  const WindChime = () => {
    return (
      <div className="fixed top-0 right-10 z-40 pointer-events-none hidden sm:block">
        <div className="relative origin-top animate-sway">
          {/* String */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] h-16 bg-sky-200"></div>
          
          {/* Bell / Dome */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-14 h-12 bg-gradient-to-br from-white/90 to-sky-100/80 backdrop-blur-sm rounded-t-full border border-white/50 shadow-lg z-10 flex items-end justify-center">
             {/* Bell rim */}
             <div className="w-full h-1 bg-sky-100 rounded-full opacity-50 mb-1"></div>
          </div>

          {/* Inner String */}
          <div className="absolute left-1/2 -translate-x-1/2 top-20 w-[1px] h-20 bg-sky-200 z-0"></div>

          {/* Paper Strip */}
          <div className="absolute left-1/2 -translate-x-1/2 top-40 w-10 h-24 bg-white/90 border border-sky-100 shadow-sm origin-top animate-wiggle flex items-center justify-center rounded-sm">
             <span className="writing-vertical text-xs text-sky-400 font-serif tracking-widest opacity-80" style={{ writingMode: 'vertical-rl' }}>風鈴</span>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <LoadingScreen onFinished={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-slate-50 via-sky-50 to-white p-4 sm:p-8 font-sans selection:bg-sky-200">
      
      {/* Wind Chime */}
      <WindChime />

      {/* Main Container */}
      <main className="max-w-5xl mx-auto mt-4 sm:mt-12 mb-24 relative z-10">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* Profile Card - Uses new Sky Blue Nebula theme via BentoCard default */}
          <BentoCard colSpan="col-span-1 md:col-span-2" rowSpan="row-span-1" className="group shadow-lg shadow-sky-100">
             <div className="flex flex-row items-center gap-4 sm:gap-8 h-full">
                 <div className="relative shrink-0">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-[0_0_20px_-5px_rgba(186,230,253,0.5)] transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105">
                        <img 
                            src="osiris bento/01.jpg" 
                            onError={(e) => {
                                e.currentTarget.src = "https://picsum.photos/300/300"; // Fallback
                            }}
                            alt="Osiris Avatar" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-sky-400 w-5 h-5 rounded-full border-2 border-white animate-pulse shadow-sm" title="Online"></div>
                 </div>
                 
                 <div className="flex flex-col justify-center h-full space-y-2">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">Osiris</h1>
                        <div className="inline-block px-3 py-1 rounded-full bg-sky-100/50 border border-sky-200 text-xs font-bold text-sky-600 uppercase tracking-wider mt-2 backdrop-blur-sm">
                            Developer / Dreamer
                        </div>
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed max-w-xs sm:max-w-sm">
                      common person, <span className="text-sky-500 font-bold decoration-sky-300 underline decoration-2 underline-offset-2">love Catsimple best</span>
                    </p>
                 </div>
             </div>
          </BentoCard>

          {/* Portfolio / Music Block */}
          <BentoCard title="Music (Japanese)">
            <div className="space-y-3">
                {['Yamashita Daiki', 'Mukai Taichi', 'Other J-Pop'].map((item, idx) => (
                    <div key={idx} className="flex items-center p-3 bg-white/50 rounded-xl border border-sky-100/50 hover:border-sky-200 hover:bg-white/80 transition-all cursor-default group shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sky-400 mr-3 shadow-sm group-hover:scale-110 transition-transform border border-sky-50">
                            <i className="fas fa-music text-xs"></i>
                        </div>
                        <span className="font-medium text-slate-700 text-sm">{item}</span>
                    </div>
                ))}
            </div>
          </BentoCard>

          {/* Skills / Anime Block */}
          <BentoCard title="Anime Favorites">
             <ul className="space-y-2">
                 {[
                     { name: 'Detective Conan', icon: 'fa-search' },
                     { name: 'Hunter x Hunter', icon: 'fa-star' },
                     { name: 'Run with the Wind', icon: 'fa-wind' }
                 ].map((anime, idx) => (
                     <li key={idx} className="flex items-center justify-between p-2 border-b border-sky-100 last:border-0 hover:bg-white/40 rounded-lg transition-colors">
                         <span className="text-slate-700 font-medium text-sm">{anime.name}</span>
                         <i className={`fas ${anime.icon} text-sky-400 opacity-80`}></i>
                     </li>
                 ))}
             </ul>
          </BentoCard>

          {/* Contact / Social Block - Keeping the specific Gradient style, disabling Nebula to maintain design integrity */}
          <BentoCard title="Get in Touch" colSpan="col-span-1 md:col-span-2" enableEffect={false} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-200/50 border-none">
            <div className="flex flex-col sm:flex-row items-center justify-around h-full gap-4">
                <a href="https://github.com/OsirisZhou" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 hover:bg-white transition-all duration-300 hover:scale-105 backdrop-blur-md w-full sm:w-auto justify-center border border-white/20 text-white hover:text-blue-600 hover:shadow-md">
                    <i className="fab fa-github text-2xl"></i>
                    <span className="font-bold">GitHub</span>
                </a>
                <a href="mailto:13330166118@163.com" className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 hover:bg-white transition-all duration-300 hover:scale-105 backdrop-blur-md w-full sm:w-auto justify-center border border-white/20 text-white hover:text-blue-600 hover:shadow-md">
                    <i className="fas fa-envelope text-2xl"></i>
                    <span className="font-bold">Email Me</span>
                </a>
            </div>
          </BentoCard>

        </div>

        {/* Footer Text */}
        <div className="flex justify-center mt-16 mb-8">
            <div className="px-8 py-3 rounded-full bg-white/60 backdrop-blur-md border border-sky-100 shadow-sm hover:shadow-sky-100 hover:bg-white/80 transition-all duration-500 cursor-default">
                <p className="text-sm font-serif italic text-slate-500 hover:text-sky-600 transition-colors duration-300">
                    "Osiris is Loving Catsimple for Now and Ever."
                </p>
            </div>
        </div>

      </main>

      {/* Floating Cat Component */}
      <FloatingCat />

    </div>
  );
};

export default App;
