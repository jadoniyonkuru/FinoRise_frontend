export default function HeroSection() {
  return (
    
    <section className="relative bg-gradient-to-br from-[#0a0f1c] to-[#1a1f2e] text-white pt-32 pb-20 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 text-center">
        <h1 className="text-3xl md:text-[48px] font-bold mb-4 leading-tight">
          Elevate Your <span className="text-[#0ea5e9]">Financial Future</span>
        </h1>
        <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto mb-8">
          FinoRise is the AI-driven ecosystem where gaining meets financial mastery.
          Experience immersive simulations, curated learning, and behavioral coaching.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold px-8 py-3 rounded-full transition shadow-lg hover:shadow-xl uppercase">
            START YOUR JOURNEY
          </button>
          <button className="border border-white/30 hover:border-[#0ea5e9] text-white font-semibold px-8 py-3 rounded-full transition hover:bg-[#0ea5e9]/10 uppercase">
            TRY SIMULATION
          </button>
        </div>
      </div>
    </section>
  );
}