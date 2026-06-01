import { Check } from 'lucide-react';

export default function SimulationSection() {
  return (
    <section id="simulations" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-[36px] font-bold text-[#1e293b] mb-4">
              Hyper-Realistic Simulations
            </h2>
            <p className="text-[#64748b] text-base mb-6">
              Step into the shoes of a professional navigating the complex world of finance.
              Every decision counts toward your score.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                <span className="text-[#1e293b]">Branching Narrative Paths</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                <span className="text-[#1e293b]">Real-Time Financial Impact</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                <span className="text-[#1e293b]">Emotional Decision Making</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-6">
              <div>
                <h4 className="text-[20px] font-semibold text-[#1e293b]">Foundational</h4>
                <p className="text-base text-[#64748b]">
                  Master budgeting, taxes, and credit basics through interactive modules.
                </p>
              </div>
              <div>
                <h4 className="text-[20px] font-semibold text-[#1e293b]">Advanced Strategy</h4>
                <p className="text-base text-[#64748b]">
                  Dive deep into asset allocation, diversification, and market analysis.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#0a0f1c] to-[#1a1f2e] rounded-2xl p-6 text-white shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full">SIMULATION</span>
              <span className="text-[#0ea5e9] font-bold">LIVE</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Budget Challenge: City Living</h3>
            <div className="flex items-center gap-2 text-sm text-slate-300 mb-4">
              <span>Difficulty: Medium</span>
              <span>•</span>
              <span>15 min</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full mb-4">
              <div className="w-2/3 h-2 bg-[#0ea5e9] rounded-full"></div>
            </div>
            <button className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] py-2 rounded-lg transition font-semibold">
              Launch Simulation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}