
import React, { useState } from 'react';

const FloatingCat: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Using an SVG for the cat to ensure it works without external assets, 
  // but styled to look cute and animated.
  return (
    <div 
      className={`fixed bottom-8 right-8 z-50 cursor-pointer transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100 animate-float'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Meow!"
    >
      <div className="relative w-16 h-16">
        {/* SVG Cat */}
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
          <g transform={isHovered ? "translate(0, -5)" : "translate(0,0)"}>
             {/* Tail */}
            <path d="M160,150 Q190,120 170,100 T150,120" fill="none" stroke="#333" strokeWidth="12" strokeLinecap="round" className="origin-bottom-left animate-wiggle" style={{ animationPlayState: isHovered ? 'running' : 'paused' }}/>
            
            {/* Body */}
            <ellipse cx="100" cy="140" rx="60" ry="45" fill="#333" />
            
            {/* Head */}
            <circle cx="100" cy="90" r="45" fill="#333" />
            
            {/* Ears */}
            <polygon points="70,60 60,20 100,50" fill="#333" />
            <polygon points="130,60 140,20 100,50" fill="#333" />
            
            {/* Inner Ears */}
            <polygon points="72,58 65,30 90,52" fill="#pink" className="opacity-60" />
            <polygon points="128,58 135,30 110,52" fill="#pink" className="opacity-60" />

            {/* Eyes */}
            <circle cx="85" cy="85" r="6" fill="#fff" className={isHovered ? "animate-pulse" : ""} />
            <circle cx="115" cy="85" r="6" fill="#fff" className={isHovered ? "animate-pulse" : ""} />
            
            {/* Pupils */}
            <circle cx="85" cy="85" r="2" fill="#000" />
            <circle cx="115" cy="85" r="2" fill="#000" />

            {/* Nose */}
            <polygon points="95,95 105,95 100,102" fill="#ffb6c1" />
            
            {/* Whiskers */}
            <line x1="70" y1="95" x2="40" y2="90" stroke="#fff" strokeWidth="2" />
            <line x1="70" y1="100" x2="40" y2="105" stroke="#fff" strokeWidth="2" />
            <line x1="130" y1="95" x2="160" y2="90" stroke="#fff" strokeWidth="2" />
            <line x1="130" y1="100" x2="160" y2="105" stroke="#fff" strokeWidth="2" />

            {/* Chat bubble that appears on hover */}
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

export default FloatingCat;
