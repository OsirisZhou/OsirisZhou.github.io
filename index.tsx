import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// --- Component: NebulaEffect (Theme: Sky Blue) ---
const NebulaEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const parent = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    // Configuration: Light Sky Blue Theme
    // Base: Sky-50, Clouds: Sky-100, Sky-200, Blue-100
    const COLORS = ['#f0f9ff', '#e0f2fe', '#bae6fd', '#dbeafe'];
    
    // Layer 2: Particles Configuration
    const PARTICLE_COUNT_MAJOR = 15;
    const PARTICLE_COUNT_DUST = 200;
    
    // Interaction Config
    const REPEL_RADIUS = 150;
    
    class Particle {
        x: number;
        y: number;
        isMajor: boolean;
        size: number;
        brightness: number;
        blinkSpeed: number;
        vx: number;
        vy: number;

        constructor(w: number, h: number, major: boolean) {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.isMajor = major;
            
            if (major) {
                this.size = Math.random() * 2 + 1; // 1px - 3px
            } else {
                this.size = Math.random() * 1.5 + 0.5; // 0.5px - 2px
            }
            
            this.brightness = Math.random();
            this.blinkSpeed = (Math.random() * 0.02) + 0.005; // Shimmer speed
            
            // Internal Flow Speed (Slow drift)
            this.vx = (Math.random() - 0.5) * 0.2;
            this.vy = (Math.random() - 0.5) * 0.2;
        }
        
        update(mx: number, my: number) {
            this.x += this.vx;
            this.y += this.vy;
            
            // Boundary wrap
            if (this.x < 0) this.x = width;
            else if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            else if (this.y > height) this.y = 0;

            // Interaction: Repel Particles
            if (mx > -100 && my > -100) {
                const dx = mx - this.x;
                const dy = my - this.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < REPEL_RADIUS) {
                    const angle = Math.atan2(dy, dx);
                    const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
                    const push = force * 2.0; // Repel strength
                    
                    this.x -= Math.cos(angle) * push;
                    this.y -= Math.sin(angle) * push;
                }
            }

            // Shimmer Effect
            this.brightness += this.blinkSpeed;
            if (this.brightness > 1 || this.brightness < 0.3) this.blinkSpeed *= -1;
        }

        draw(ctx: CanvasRenderingContext2D) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            
            // Particle Color: Sky Blue / Blue-400 to make them visible on light bg
            ctx.fillStyle = `rgba(56, 189, 248, ${Math.abs(this.brightness)})`;
            
            if (this.isMajor) {
                ctx.shadowBlur = 4;
                ctx.shadowColor = 'rgba(14, 165, 233, 0.5)'; // Sky-500 glow
            } else {
                ctx.shadowBlur = 0;
            }
            
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    let particles: Particle[] = [];
    // Nebulae Clouds
    const clouds = [
        { x: 0, y: 0, r: 0, color: COLORS[1], vx: 0.1, vy: 0.05 },
        { x: 0, y: 0, r: 0, color: COLORS[2], vx: -0.08, vy: 0.08 },
        { x: 0, y: 0, r: 0, color: COLORS[3], vx: 0.05, vy: -0.1 },
    ];

    // Layer 3: Shooting Star
    let shootingStar = { x: 0, y: 0, vx: 0, vy: 0, life: 0, active: false };
    let lastStarTime = 0;

    const init = () => {
        if (parent) {
            width = canvas.width = parent.clientWidth;
            height = canvas.height = parent.clientHeight;
        }
        
        particles = [];
        for(let i=0; i<PARTICLE_COUNT_MAJOR; i++) particles.push(new Particle(width, height, true));
        for(let i=0; i<PARTICLE_COUNT_DUST; i++) particles.push(new Particle(width, height, false));
        
        // Init Clouds relative to size
        clouds[0].x = width * 0.2; clouds[0].y = height * 0.3; clouds[0].r = Math.max(width, height) * 0.7;
        clouds[1].x = width * 0.8; clouds[1].y = height * 0.7; clouds[1].r = Math.max(width, height) * 0.8;
        clouds[2].x = width * 0.5; clouds[2].y = height * 0.5; clouds[2].r = Math.max(width, height) * 0.6;
    };

    window.addEventListener('resize', init);
    
    const onMouseMove = (e: Event) => {
        const me = e as MouseEvent;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        mouseRef.current = {
            x: me.clientX - rect.left,
            y: me.clientY - rect.top
        };
    };
    const onMouseLeave = () => {
        mouseRef.current = { x: -9999, y: -9999 };
    };
    
    if (parent) {
        parent.addEventListener('mousemove', onMouseMove);
        parent.addEventListener('mouseleave', onMouseLeave);
        init();
    }

    const animate = (time: number) => {
        ctx.clearRect(0, 0, width, height);
        
        // Base Color (Sky-50) is already bg of parent, but we draw slightly to clear
        ctx.fillStyle = COLORS[0];
        ctx.fillRect(0, 0, width, height);

        // 1. Nebula
        ctx.globalCompositeOperation = 'multiply'; 
        clouds.forEach(c => {
            c.x += c.vx; c.y += c.vy;
            if (c.x < -width*0.2 || c.x > width*1.2) c.vx *= -1;
            if (c.y < -height*0.2 || c.y > height*1.2) c.vy *= -1;
            
            const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
            g.addColorStop(0, c.color);
            g.addColorStop(1, '#ffffff'); 
            
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.r, 0, Math.PI*2);
            ctx.fill();
        });
        ctx.globalCompositeOperation = 'source-over'; 

        // 2. Particles
        particles.forEach(p => {
            p.update(mouseRef.current.x, mouseRef.current.y);
            p.draw(ctx);
        });

        // 3. Shooting Star
        if (time - lastStarTime > 8000) { 
            shootingStar.active = true;
            shootingStar.x = Math.random() * width * 0.8 + width * 0.1;
            shootingStar.y = Math.random() * height * 0.3; 
            shootingStar.vx = -3 - Math.random() * 3; 
            shootingStar.vy = 2 + Math.random() * 2; 
            shootingStar.life = 1.0;
            lastStarTime = time;
        }
        
        if (shootingStar.active) {
            shootingStar.x += shootingStar.vx;
            shootingStar.y += shootingStar.vy;
            shootingStar.life -= 0.02;
            
            if (shootingStar.life <= 0) shootingStar.active = false;

            const tailLength = 20;
            const tailX = shootingStar.x - shootingStar.vx * tailLength;
            const tailY = shootingStar.y - shootingStar.vy * tailLength;
            
            const g = ctx.createLinearGradient(shootingStar.x, shootingStar.y, tailX, tailY);
            g.addColorStop(0, `rgba(14, 165, 233, ${shootingStar.life})`); 
            g.addColorStop(1, 'transparent');
            
            ctx.beginPath();
            ctx.moveTo(shootingStar.x, shootingStar.y);
            ctx.lineTo(tailX, tailY);
            ctx.strokeStyle = g;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.stroke();
        }

        requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
        window.removeEventListener('resize', init);
        if (parent) {
            parent.removeEventListener('mousemove', onMouseMove);
            parent.removeEventListener('mouseleave', onMouseLeave);
        }
        cancelAnimationFrame(animId);
    };

  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in opacity-100" />;
};

// --- Component: BentoCard ---
interface BentoCardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    colSpan?: string;
    rowSpan?: string;
    enableEffect?: boolean;
}

const BentoCard: React.FC<BentoCardProps> = ({ 
  title, 
  children, 
  className = "", 
  colSpan = "col-span-1", 
  rowSpan = "row-span-1",
  enableEffect = true 
}) => {
  return (
    <div className={`relative overflow-hidden backdrop-blur-md rounded-3xl p-6 shadow-sm border border-sky-50 
      hover:shadow-[0_10px_40px_-10px_rgba(14,165,233,0.2)] hover:border-sky-200 hover:ring-2 hover:ring-sky-50/50
      transition-all duration-300 hover:-translate-y-1 ${colSpan} ${rowSpan} ${className}
      ${!enableEffect ? 'bg-white/80' : ''} 
    `}>
      
      {/* Background Effect */}
      {enableEffect && (
        <div className="absolute inset-0 z-0 opacity-60">
          <NebulaEffect />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full">
        {title && <h2 className="text-xl font-bold mb-4 tracking-tight">{title}</h2>}
        <div className="h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Component: FloatingCat (Right Bottom) ---
const FloatingCat = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`fixed bottom-8 right-8 z-50 cursor-pointer transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100 animate-float'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Meow!"
    >
      <div className="relative w-16 h-16">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
          <g transform={isHovered ? "translate(0, -5)" : "translate(0,0)"}>
            <path d="M160,150 Q190,120 170,100 T150,120" fill="none" stroke="#333" strokeWidth="12" strokeLinecap="round" className="origin-bottom-left animate-wiggle" style={{ animationPlayState: isHovered ? 'running' : 'paused' }}/>
            <ellipse cx="100" cy="140" rx="60" ry="45" fill="#333" />
            <circle cx="100" cy="90" r="45" fill="#333" />
            <polygon points="70,60 60,20 100,50" fill="#333" />
            <polygon points="130,60 140,20 100,50" fill="#333" />
            <polygon points="72,58 65,30 90,52" fill="#pink" className="opacity-60" />
            <polygon points="128,58 135,30 110,52" fill="#pink" className="opacity-60" />
            <circle cx="85" cy="85" r="6" fill="#fff" className={isHovered ? "animate-pulse" : ""} />
            <circle cx="115" cy="85" r="6" fill="#fff" className={isHovered ? "animate-pulse" : ""} />
            <circle cx="85" cy="85" r="2" fill="#000" />
            <circle cx="115" cy="85" r="2" fill="#000" />
            <polygon points="95,95 105,95 100,102" fill="#ffb6c1" />
            <line x1="70" y1="95" x2="40" y2="90" stroke="#fff" strokeWidth="2" />
            <line x1="70" y1="100" x2="40" y2="105" stroke="#fff" strokeWidth="2" />
            <line x1="130" y1="95" x2="160" y2="90" stroke="#fff" strokeWidth="2" />
            <line x1="130" y1="100" x2="160" y2="105" stroke="#fff" strokeWidth="2" />
            <g className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
               <path d="M150,40 Q170,40 170,60 Q170,80 150,80 Q140,80 130,70 L120,80 L125,65 Q110,65 110,50 Q110,40 150,40" fill="white" stroke="#333" strokeWidth="2" />
               <text x="140" y="65" fontFamily="Arial" fontSize="14" fill="#333" textAnchor="middle">Meow~</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

// --- Component: LoadingScreen ---
interface Bubble {
    id: string;
    style: React.CSSProperties;
}

const LoadingScreen = ({ onFinished }: { onFinished: () => void }) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const nextSpawnTimeRef = useRef(0);
  const startTimeRef = useRef(Date.now());
  const isFinishedRef = useRef(false);
  const animationFrameRef = useRef(0);

  useEffect(() => {
    const loop = () => {
        if (isFinishedRef.current) return;
        const now = Date.now();
        const elapsed = now - startTimeRef.current;
        
        let spawnRate = 100; 
        if (elapsed > 2000) spawnRate = 40; 
        if (elapsed > 3500) spawnRate = 10; 
        
        if (elapsed > 4500) { 
            isFinishedRef.current = true;
            onFinished();
            return; 
        }

        if (now > nextSpawnTimeRef.current) {
            nextSpawnTimeRef.current = now + spawnRate;
            const id = `b-${now}-${Math.random()}`;
            const spread = elapsed > 3000 ? 60 : 30;
            const startOffset = (Math.random() * spread - (spread/2)) + 'vw'; 
            const size = Math.floor(Math.random() * 8) + 4; 
            const life = (Math.random() * 2 + 2) + 's';
            const swayEnd = (Math.random() * 10 - 5) + 'vw'; 

            setBubbles(prev => [...prev.slice(-150), {
                id,
                style: {
                    width: `${size}px`,
                    height: `${size}px`,
                    '--life': life,
                    '--start-offset': startOffset,
                    '--sway-end': swayEnd
                } as React.CSSProperties
            }]);
        }
        animationFrameRef.current = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [onFinished]);

  return (
    <div className="clean-bg flex flex-col items-center justify-center relative w-screen h-screen">
        <div className="gray-overlay"></div>
        <div className="z-30 flex flex-col items-center justify-center gap-4 loader-pulse">
             <div className="w-12 h-12 rounded-full border-4 border-sky-100 border-t-sky-400 animate-spin"></div>
             <h1 className="text-sky-800 font-bold tracking-widest text-sm uppercase">Loading...</h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-full overflow-hidden z-10 pointer-events-none">
            {bubbles.map(b => (
                <div key={b.id} className="bubble-particle" style={b.style}></div>
            ))}
        </div>
    </div>
  );
};

// --- Component: App ---
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const WindChime = () => (
      <div className="fixed top-0 right-10 z-40 pointer-events-none hidden sm:block">
        <div className="relative origin-top animate-sway">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] h-16 bg-sky-200"></div>
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-14 h-12 bg-gradient-to-br from-white/90 to-sky-100/80 backdrop-blur-sm rounded-t-full border border-white/50 shadow-lg z-10 flex items-end justify-center">
             <div className="w-full h-1 bg-sky-100 rounded-full opacity-50 mb-1"></div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-20 w-[1px] h-20 bg-sky-200 z-0"></div>
          <div className="absolute left-1/2 -translate-x-1/2 top-40 w-10 h-24 bg-white/90 border border-sky-100 shadow-sm origin-top animate-wiggle flex items-center justify-center rounded-sm">
             <span className="writing-vertical text-xs text-sky-400 font-serif tracking-widest opacity-80" style={{ writingMode: 'vertical-rl' }}>風鈴</span>
          </div>
        </div>
      </div>
  );

  if (isLoading) return <LoadingScreen onFinished={() => setIsLoading(false)} />;

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-slate-50 via-sky-50 to-white p-4 sm:p-8">
      <WindChime />
      
      <main className="max-w-5xl mx-auto mt-4 sm:mt-12 mb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* Profile Card - Nebula Enabled */}
          <BentoCard colSpan="col-span-1 md:col-span-2" className="group shadow-lg shadow-sky-100/50" enableEffect={true}>
             <div className="flex flex-row items-center gap-6 h-full relative z-10">
                 <div className="relative shrink-0">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-[0_0_20px_-5px_rgba(186,230,253,0.8)] transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105">
                        <img 
                            src="osiris bento/01.jpg" 
                            onError={(e) => { e.currentTarget.src = "https://picsum.photos/300/300"; }}
                            alt="Osiris Avatar" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-sky-400 w-5 h-5 rounded-full border-2 border-white animate-pulse shadow-sm"></div>
                 </div>
                 
                 <div className="flex flex-col justify-center">
                    <h1 className="text-4xl font-black tracking-tight text-slate-800 leading-tight">Osiris</h1>
                    <div className="inline-flex self-start items-center px-3 py-1 mt-2 rounded-full bg-white/60 border border-sky-200 text-xs font-bold text-sky-600 uppercase tracking-wider backdrop-blur-sm">
                        Developer / Dreamer
                    </div>
                    <p className="text-slate-600 text-sm font-medium mt-3">
                      common person, <span className="text-sky-500 font-bold underline decoration-sky-300 decoration-2 underline-offset-2">love Catsimple best</span>
                    </p>
                 </div>
             </div>
          </BentoCard>

          {/* Music - Nebula Enabled */}
          <BentoCard title="Music (Japanese)" enableEffect={true}>
            <div className="space-y-3 relative z-10">
                {['Yamashita Daiki', 'Mukai Taichi', 'Other J-Pop'].map((item, idx) => (
                    <div key={idx} className="flex items-center p-3 bg-white/40 backdrop-blur-sm rounded-xl border border-sky-100 hover:bg-white/70 transition-all cursor-default group">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sky-400 mr-3 shadow-sm border border-sky-50">
                            <i className="fas fa-music text-xs"></i>
                        </div>
                        <span className="font-medium text-slate-700 text-sm">{item}</span>
                    </div>
                ))}
            </div>
          </BentoCard>

          {/* Anime - Nebula Enabled */}
          <BentoCard title="Anime Favorites" enableEffect={true}>
             <ul className="space-y-2 relative z-10">
                 {[
                     { name: 'Detective Conan', icon: 'fa-search' },
                     { name: 'Hunter x Hunter', icon: 'fa-star' },
                     { name: 'Run with the Wind', icon: 'fa-wind' }
                 ].map((anime, idx) => (
                     <li key={idx} className="flex items-center justify-between p-2 border-b border-sky-100/50 last:border-0 hover:bg-white/30 rounded-lg transition-colors">
                         <span className="text-slate-700 font-medium text-sm">{anime.name}</span>
                         <i className={`fas ${anime.icon} text-sky-400 opacity-80`}></i>
                     </li>
                 ))}
             </ul>
          </BentoCard>

          {/* Contact - Custom Blue Gradient (No Nebula, uses pure CSS gradient) */}
          <BentoCard 
             title="Get in Touch" 
             colSpan="col-span-1 md:col-span-2" 
             enableEffect={false} 
             className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-200/50 border-none"
          >
            <div className="flex flex-col sm:flex-row items-center justify-around h-full gap-4">
                <a href="https://github.com/OsirisZhou" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-8 py-3 rounded-full bg-white/20 hover:bg-white transition-all duration-300 hover:scale-105 backdrop-blur-md border border-white/20 text-white hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/30">
                    <i className="fab fa-github text-2xl"></i>
                    <span className="font-bold">GitHub</span>
                </a>
                <a href="mailto:13330166118@163.com" className="flex items-center gap-3 px-8 py-3 rounded-full bg-white/20 hover:bg-white transition-all duration-300 hover:scale-105 backdrop-blur-md border border-white/20 text-white hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/30">
                    <i className="fas fa-envelope text-2xl"></i>
                    <span className="font-bold">Email Me</span>
                </a>
            </div>
          </BentoCard>

        </div>

        {/* Footer */}
        <div className="flex justify-center mt-16 mb-8">
            <div className="px-8 py-3 rounded-full bg-white/60 backdrop-blur-md border border-sky-100 shadow-sm hover:shadow-sky-100 hover:bg-white/80 transition-all cursor-default">
                <p className="text-sm font-serif italic text-slate-500 hover:text-sky-600 transition-colors">
                    "Osiris is Loving Catsimple for Now and Ever."
                </p>
            </div>
        </div>
      </main>

      <FloatingCat />
    </div>
  );
};

// --- Root Render ---
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
