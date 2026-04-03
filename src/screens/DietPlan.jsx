import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/MobileContainer.jsx';
import { useUser } from '../contexts/UserContext.jsx';

export default function DietPlan() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const getImage = (term, name) => {
    const search = term || name || "healthy meal";
    const encoded = encodeURIComponent(search);
    // Primary: Unsplash - adding some randomization/descriptiveness
    return `https://source.unsplash.com/featured/800x600/?${encoded},food,healthy`;
  };

  // Access the 7-day meal plan from context (primary) or global state (fallback)
  const rawMealPlan = user.aiPlan?.mealPlan || user.aiPlan ||
                      window.fitmorphData?.mealPlan || 
                      window.fitmorphData?.aiResponse?.mealPlan;
  
  // Robust normalization of meal plan structure
  let mealPlanData = {};
  if (rawMealPlan && typeof rawMealPlan === 'object') {
    if (Array.isArray(rawMealPlan)) {
      mealPlanData = { days: rawMealPlan };
    } else if (rawMealPlan.days && Array.isArray(rawMealPlan.days)) {
      mealPlanData = rawMealPlan;
    } else if (rawMealPlan.mealPlan && Array.isArray(rawMealPlan.mealPlan.days)) {
      mealPlanData = rawMealPlan.mealPlan;
    } else {
      // Look for days in keys
      const detectedDays = Object.entries(rawMealPlan)
        .filter(([key]) => key.toLowerCase().includes('day') || ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'].includes(key.toLowerCase()))
        .map(([key, value]) => ({ day: key, ...value }));
      
      if (detectedDays.length > 0) {
        mealPlanData = { days: detectedDays };
      } else {
        mealPlanData = rawMealPlan;
      }
    }
  }

  const days = mealPlanData.days || [];
  const isPlanAvailable = Array.isArray(days) && days.length > 0;
  
  const currentDayData = isPlanAvailable ? (days[selectedDay] || days[0]) : (mealPlanData.meals ? {
    day: "Day " + (selectedDay + 1),
    calories: mealPlanData.calories || 2400,
    macros: mealPlanData.macros || { p: "0g", c: "0g", f: "0g" },
    meals: mealPlanData.meals
  } : null);

  if (!isPlanAvailable && !currentDayData) {
    return (
      <MobileContainer>
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center justify-center p-10 text-center">
          <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 animate-pulse">
            <span className="material-symbols-outlined text-4xl">Auto_Awesome</span>
          </div>
          <h2 className="text-2xl font-bold font-urbanist mb-2">Protocol Pending</h2>
          <p className="text-slate-500 text-sm mb-8">Your personalized AI fuel protocol is being synchronized. Please ensure you've completed a body scan.</p>
          <button onClick={() => navigate('/scan')} className="px-8 py-4 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-primary/20 active:scale-95 transition-all">
            Go to Scanner
          </button>
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col relative overflow-hidden antialiased italic-none">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl px-6 py-4 border-b border-primary/10">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate('/dashboard')} className="size-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 active:scale-95 transition-all">
              <span className="material-symbols-outlined font-bold">arrow_back</span>
            </button>
            <h1 className="text-xl font-bold tracking-tight font-urbanist uppercase">Fuel Protocol</h1>
            <button className="size-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 active:scale-95 transition-all">
              <span className="material-symbols-outlined font-bold">nutrition</span>
            </button>
          </div>

          {/* Day Selector */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
            {days.length > 0 ? days.map((day, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedDay(idx)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${selectedDay === idx ? 'bg-primary text-white shadow-lg shadow-primary/40 scale-105 transition-all active:scale-95' : 'bg-slate-100 dark:bg-white/5 text-slate-500'}`}
              >
                {(() => {
                  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                  if (day.day && day.day.toString().length > 3 && !day.day.toString().includes('Day')) {
                    return day.day.toString().substring(0, 3);
                  }
                  return dayNames[idx % 7];
                })()}
              </button>
            )) : ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d, idx) => (
              <button key={idx} className="flex-shrink-0 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest bg-slate-100 dark:bg-white/5 text-slate-500 opacity-50 select-none">
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-6 pb-32 pt-6 scroll-smooth">
          {/* Calorie Card */}
          <section className="bg-primary/20 rounded-[2.5rem] p-8 border border-primary/30 relative overflow-hidden mb-8 shadow-2xl">
            <div className="absolute top-0 right-0 p-4">
              <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl font-bold">bolt</span>
              </div>
            </div>
            <div className="relative z-10">
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-2 block">{currentDayData.day} Target</span>
              <div className="flex items-baseline gap-2">
                <h2 className="text-5xl font-black font-urbanist tracking-tighter text-slate-900 dark:text-white leading-none">{currentDayData.calories}</h2>
                <span className="text-lg font-bold text-slate-500 uppercase tracking-widest">kcal</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Protein</span>
                  <span className="text-lg font-bold text-primary font-urbanist">{currentDayData.macros?.p || currentDayData.macros?.protein || "---"}</span>
                </div>
                <div className="flex flex-col border-l border-slate-200 dark:border-white/10 pl-4">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Carbs</span>
                  <span className="text-lg font-bold text-primary font-urbanist">{currentDayData.macros?.c || currentDayData.macros?.carbs || "---"}</span>
                </div>
                <div className="flex flex-col border-l border-slate-200 dark:border-white/10 pl-4">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Fats</span>
                  <span className="text-lg font-bold text-primary font-urbanist">{currentDayData.macros?.f || currentDayData.macros?.fats || "---"}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Meals List */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-urbanist tracking-tight mb-2">Nutrient Distribution</h3>
            {Object.entries(currentDayData.meals || {}).map(([type, meal]) => (
              <div key={type} className="bg-white/50 dark:bg-white/[0.03] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-xl group transition-all hover:border-primary/30 backdrop-blur-xl">
                <div className="relative h-48 w-full">
                  <img 
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    src={meal?.imageUrl || getImage(meal?.imageSearchTerm, meal?.name)} 
                    alt={meal?.title || type} 
                  />
                  <div className="absolute top-4 left-4 bg-background-dark/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-[9px] font-bold text-white uppercase tracking-[0.2em]">{type}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white font-urbanist leading-tight">{meal?.title || "Recommended Nutrition"}</h4>
                    {meal?.grams && <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg uppercase whitespace-nowrap">{meal.grams}</span>}
                  </div>
                  <button 
                    onClick={() => setSelectedRecipe({ ...meal, type })} 
                    className="w-full mt-4 py-3 rounded-xl border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-primary/5 transition-colors active:scale-95"
                  >
                    View Recipe Details
                  </button>
                </div>
              </div>
            ))}
            
            {(!currentDayData.meals || Object.keys(currentDayData.meals).length === 0) && (
              <div className="text-center py-10 opacity-50">
                <p className="text-sm font-bold uppercase tracking-widest text-slate-500">No protocol for this day</p>
              </div>
            )}
          </div>

          {/* Guidelines Section */}
          {mealPlanData.guidelines && (
            <section className="mt-10 p-6 rounded-3xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-8 shadow-inner">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#00f2ff] mb-4 flex items-center gap-2 font-urbanist">
                <span className="material-symbols-outlined text-base">info</span>
                Mission Parameters
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-tighter text-slate-500 mb-1">Hydration Protocol</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{mealPlanData.guidelines.hydration}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-tighter text-slate-500 mb-2">Restricted Components</p>
                  <div className="flex flex-wrap gap-2">
                    {mealPlanData.guidelines.avoid && mealPlanData.guidelines.avoid.map((item, i) => (
                      <span key={i} className="text-[9px] font-bold px-2 py-1 rounded-md bg-red-500/10 text-red-500 border border-red-500/20">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          <div className="h-20"></div>
        </main>

        {/* Recipe Modal */}
        {selectedRecipe && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-10 sm:pb-20 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-lg bg-background-light dark:bg-[#161229] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-10 duration-500 max-h-[85vh] flex flex-col">
              <div className="relative h-56 shrink-0">
                <img className="size-full object-cover" src={selectedRecipe.imageUrl || getImage(selectedRecipe.imageSearchTerm, selectedRecipe.title)} alt={selectedRecipe.title} />
                <button onClick={() => setSelectedRecipe(null)} className="absolute top-4 right-4 size-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10 active:scale-90 transition-all">
                  <span className="material-symbols-outlined">close</span>
                </button>
                <div className="absolute bottom-4 left-6">
                   <span className="text-[10px] font-black uppercase tracking-widest bg-primary px-3 py-1 rounded-full text-white shadow-lg">{selectedRecipe.type}</span>
                   <h3 className="text-2xl font-black text-white mt-1 drop-shadow-lg font-urbanist">{selectedRecipe.title}</h3>
                </div>
              </div>
              
              <div className="p-8 overflow-y-auto no-scrollbar space-y-8 pb-12">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#00f2ff] mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">inventory_2</span> Ingredients
                  </h4>
                  <ul className="space-y-3">
                    {(selectedRecipe.recipe?.ingredients || [
                      "Fresh seasonal ingredients",
                      "Organic protein source",
                      "Complex carbohydrate base",
                      "Healthy fats & seasonings"
                    ]).map((ing, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(110,61,255,0.8)]"></span>
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#00f2ff] mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">cooking</span> Preparation
                  </h4>
                  <div className="space-y-4">
                    {(selectedRecipe.recipe?.instructions || [
                      "Prepare and wash all fresh ingredients thoroughly.",
                      "Cook the protein source to target temperature.",
                      "Combine components with seasoning and serve warm.",
                      "Garnish for optimal nutrient presentation."
                    ]).map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="shrink-0 size-6 flex items-center justify-center rounded-full bg-primary/20 text-primary text-[10px] font-black border border-primary/20">{i + 1}</span>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Nav Bar (copied from dashboard for consistency) */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto px-6 pb-8 pointer-events-none z-50">
          <div className="flex items-center justify-around bg-white/10 dark:bg-[#1e1b28]/95 backdrop-blur-2xl rounded-full p-2 pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
            <button onClick={() => navigate('/dashboard')} key="home" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-2xl">home</span>
              <p className="text-[9px] font-bold uppercase tracking-tighter">Home</p>
            </button>
            <button key="diet" className="flex flex-1 flex-col items-center justify-center gap-1 text-primary relative">
              <div className="bg-primary/20 rounded-full p-3 -mt-6 mb-1 border border-primary/30 shadow-[0_0_20px_rgba(110,61,255,0.3)]">
                <span className="material-symbols-outlined fill-1 text-2xl">restaurant</span>
              </div>
              <p className="text-[9px] font-bold uppercase tracking-tighter">Nutrition</p>
            </button>
            <button onClick={() => navigate('/workout')} key="workout" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-2xl">fitness_center</span>
              <p className="text-[9px] font-bold uppercase tracking-tighter">Workout</p>
            </button>
            <button onClick={() => navigate('/progress')} key="stats" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-2xl">leaderboard</span>
              <p className="text-[9px] font-bold uppercase tracking-tighter">Stats</p>
            </button>
            <button onClick={() => navigate('/settings')} key="profile" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-2xl">person</span>
              <p className="text-[9px] font-bold uppercase tracking-tighter">Profile</p>
            </button>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
