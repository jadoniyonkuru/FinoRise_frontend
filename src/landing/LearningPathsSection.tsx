import { ArrowRight } from 'lucide-react';

const paths = [
  { title: "Beginner", description: "Start your journey with the basics of personal finance and saving." },
  { title: "Intermediate", description: "Advance your skills with investing strategies and debt management." },
  { title: "Advanced", description: "Master complex market analysis and asset allocation techniques." },
];

export default function LearningPathsSection() {
  return (
    <section id="learning-paths" className="py-20 bg-[#f8fafc] scroll-mt-20">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-[36px] font-bold text-[#1e293b] mb-3">
            Curated Learning Paths
          </h2>
          <p className="text-[#64748b] max-w-2xl mx-auto text-base">
            Tailored educational journeys designed to take you from novice to master.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {paths.map((path, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-slate-100 group"
            >
              <div className="mb-4">
                <span className="text-xs font-bold text-[#0ea5e9] uppercase tracking-wider">Level</span>
              </div>
              <h3 className="text-[20px] font-semibold text-[#1e293b] mb-3">
                {path.title}
              </h3>
              <p className="text-[#64748b] text-base mb-6">{path.description}</p>
              <a 
                href="#" 
                className="text-[#0ea5e9] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                Explore <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}