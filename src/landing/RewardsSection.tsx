import { Gift } from 'lucide-react';

export default function RewardsSection() {
  const perks = [
    { title: "PREMIUM ACCESS", description: "Unlock exclusive fintech tools and advanced modules." },
    { title: "ELITE BADGES", description: "Showcase your financial mastery with rare, tradeable badges." },
    { title: "PARTNER PERKS", description: "Redeem XP for discounts, gift cards, and real-world rewards." },
  ];

  return (
    <section id="rewards" className="py-20 bg-[#0a0f1c] text-white scroll-mt-20">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-[36px] font-bold mb-3">Real-World Gold</h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-base">
            Your dedication to financial literacy pays off. Redeem your hard-earned XP
            for premium gold perks and fintech partner benefits.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {perks.map((perk, idx) => (
            <div key={idx} className="text-center p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0ea5e9]/20 flex items-center justify-center">
                <Gift className="w-8 h-8 text-[#0ea5e9]" />
              </div>
              <h3 className="text-[20px] font-semibold mb-2">{perk.title}</h3>
              <p className="text-slate-400 text-base">{perk.description}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold px-8 py-3 rounded-full transition uppercase">
            VIEW REWARD CATALOG
          </button>
          <button className="border border-white/30 hover:border-[#0ea5e9] text-white font-semibold px-8 py-3 rounded-full transition hover:bg-[#0ea5e9]/10 uppercase">
            GOLD REWARDS
          </button>
        </div>
      </div>
    </section>
  );
}