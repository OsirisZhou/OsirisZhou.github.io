
import React from 'react';
import NebulaEffect from './NebulaEffect';

interface BentoCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  colSpan?: string; // Tailwind classes for column spanning
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
        {title && <h2 className="text-xl font-bold mb-4 text-slate-700 tracking-tight">{title}</h2>}
        <div className="h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BentoCard;
