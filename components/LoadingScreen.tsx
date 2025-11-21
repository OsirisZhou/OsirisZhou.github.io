import React, { useState, useEffect, useRef } from 'react';

interface Bubble {
  id: string;
  style: React.CSSProperties;
}

const LoadingScreen: React.FC<{ onFinished: () => void }> = ({ onFinished }) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const animationFrameRef = useRef<number>(0);
  const startTimeRef = useRef(Date.now());
  const nextSpawnTimeRef = useRef(0);
  const isFinishedRef = useRef(false);

  useEffect(() => {
    const loop = () => {
        if (isFinishedRef.current) return;

        const now = Date.now();
        const elapsed = now - startTimeRef.current;

        // --- Logic: Tiny Bubbles Blooming ---
        // 0-2s: Build up
        // 2-4s: Faster
        // 4s+: High Frequency (Bloom)
        
        let spawnRate = 100; 
        if (elapsed > 2000) spawnRate = 40; 
        if (elapsed > 3500) spawnRate = 10; // High density for "Blooming" effect
        
        if (elapsed > 5000) { 
            isFinishedRef.current = true;
            onFinished();
            return; 
        }

        if (now > nextSpawnTimeRef.current) {
            nextSpawnTimeRef.current = now + spawnRate;
            
            const id = `b-${now}-${Math.random()}`;
            // Concentrated at bottom center initially, then spreading slightly
            const spread = elapsed > 3000 ? 60 : 30; // Percentage spread width
            const startOffset = (Math.random() * spread - (spread/2)) + 'vw'; 
            
            // Tiny Sizes: 4px - 12px (Very delicate)
            const size = Math.floor(Math.random() * 8) + 4; 
            const life = (Math.random() * 2 + 2) + 's'; // 2-4s duration
            
            // Subtle Sway
            const swayEnd = (Math.random() * 10 - 5) + 'vw'; 

            const newBubble: Bubble = {
                id,
                style: {
                    width: `${size}px`,
                    height: `${size}px`,
                    '--life': life,
                    '--start-offset': startOffset,
                    '--sway-end': swayEnd
                } as React.CSSProperties
            };

            setBubbles(prev => {
                // Keep DOM light
                const kept = prev.filter(b => true).slice(-200); 
                return [...kept, newBubble];
            });
        }

        animationFrameRef.current = requestAnimationFrame(loop);
    };
    
    loop();
    
    return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [onFinished]);

  return (
    <div className="clean-bg flex flex-col items-center justify-center relative w-screen h-screen">
        
        {/* Gray Overlay Mask - Placed on top via z-index in CSS */}
        <div className="gray-overlay"></div>

        {/* Center Loading Animation */}
        <div className="z-30 flex flex-col items-center justify-center gap-4 loader-pulse">
             {/* Simple Elegant Spinner */}
             <div className="w-12 h-12 rounded-full border-4 border-sky-100 border-t-sky-400 animate-spin"></div>
             <h1 className="text-sky-800 font-bold tracking-widest text-sm uppercase">Loading...</h1>
        </div>

        {/* Bubbles Emitter Layer (Bottom) */}
        <div className="absolute bottom-0 left-0 right-0 h-full overflow-hidden z-10 pointer-events-none">
            {bubbles.map(b => (
                <div key={b.id} className="bubble-particle" style={b.style}></div>
            ))}
        </div>
    </div>
  );
};

export default LoadingScreen;