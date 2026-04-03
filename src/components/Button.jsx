import React from 'react';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = "w-full py-4 px-6 rounded-full font-bold text-lg transition-transform active:scale-95 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-neon-blue text-slate-950 neon-glow",
    glass: "glass-panel text-slate-900 dark:text-slate-100 font-semibold hover:bg-white/10"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
