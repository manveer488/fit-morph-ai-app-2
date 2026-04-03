import React from 'react';

export default function MobileContainer({ children }) {
  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-background-light dark:bg-background-dark max-w-[430px] w-full mx-auto h-full">
      {/* iOS Status Bar Spacer Area if needed */}
      {children}
      {/* iOS Bottom Indicator */}
      <div className="h-8 w-full flex justify-center items-end pb-2 shrink-0 z-50">
        <div className="h-1.5 w-32 rounded-full bg-slate-300 dark:bg-slate-700"></div>
      </div>
    </div>
  );
}
