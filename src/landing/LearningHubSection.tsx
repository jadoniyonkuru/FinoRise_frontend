import { ArrowRight } from 'lucide-react';

export default function LearningHubSection() {
  const paths = [
    { level: "Beginner", modules: 6, est: "4 hours", color: "bg-green-100 text-green-700" },
    { level: "Intermediate", modules: 8, est: "6 hours", color: "bg-blue-100 text-blue-700" },
    { level: "Advanced", modules: 10, est: "8 hours", color: "bg-purple-100 text-purple-700" },
  ];

  return (
    <section id="learning-hub" className="py-20 bg-[#f8fafc] scroll-mt-20">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-[36px] font-bold text-[#1e293b] mb-3">
            Curated Learning Paths
          </h2>
          <p className="text-[#64748b] max-w-2xl mx-auto text-base">
            Our intelligent system bridges the gap between theory and real-world behavior.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {paths.map((path, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${path.color} mb-3`}>
                {path.level}
              </span>
              <h3 className="text-lg font-semibold text-[#1e293b] mb-1">{path.modules} Modules</h3>
              <p className="text-sm text-[#64748b] mb-3">Estimated time: {path.est}</p>
              <button className="text-[#0ea5e9] font-medium text-sm hover:underline flex items-center gap-1 transition-all hover:gap-2">
                Explore <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}