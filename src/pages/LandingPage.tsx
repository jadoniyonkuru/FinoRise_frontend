import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                FinoRise
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/learner/modules" className="text-gray-200 hover:text-amber-400 transition-colors">
                Learn
              </Link>
              <Link to="/learner/simulations" className="text-gray-200 hover:text-amber-400 transition-colors">
                Simulations
              </Link>
              <Link to="/learner/rewards" className="text-gray-200 hover:text-amber-400 transition-colors">
                Rewards
              </Link>
              <Link to="/partner/dashboard" className="text-gray-200 hover:text-amber-400 transition-colors">
                Partner
              </Link>
            </div>
            <Link
              to="/auth/register"
              className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-black font-semibold transition-all transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-amber-200 to-yellow-500 bg-clip-text text-transparent">
            Elevate Your Financial Future
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
            FinoRise is the AI-driven ecosystem where gaming meets financial mastery. Experience
            immersive simulations, curated learning, and behavioral coaching.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/auth/register"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold text-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all transform hover:scale-105 inline-block"
            >
              START YOUR JOURNEY
            </Link>
            <Link
              to="/learner/simulations"
              className="px-8 py-3 rounded-full border-2 border-amber-500 text-amber-400 font-bold text-lg hover:bg-amber-500/10 transition-all transform hover:scale-105 inline-block"
            >
              TRY SIMULATION
            </Link>
          </div>
        </div>
      </section>

      {/* Master Every Domain Section */}
      <section className="py-24 px-4 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Master Every Domain</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our intelligent system bridges the gap between theory and real-world behavior.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🧠",
                title: "AI Behavioral Coach",
                desc: "Get personalized feedback on every decision you make in our high-stakes simulations.",
              },
              {
                icon: "🎮",
                title: "Immersive Scenarios",
                desc: "Navigate branching narratives of budgeting, debt recovery, and investment growth.",
              },
              {
                icon: "🏆",
                title: "Gamified Progression",
                desc: "Earn XP, unlock rare badges, and compete for partner-sponsored real-world rewards.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hyper-Realistic Simulations Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Hyper-Realistic Simulations</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Step into the shoes of a professional navigating the complex world of finance. Every
              decision counts toward your score.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left column - simulation features */}
            <div className="space-y-6">
              {[
                {
                  icon: "🌿",
                  title: "Branching Narrative Paths",
                  desc: "Every choice creates unique consequences and learning opportunities.",
                },
                {
                  icon: "📊",
                  title: "Real-Time Financial Impact",
                  desc: "Watch your portfolio respond instantly to market movements and decisions.",
                },
                {
                  icon: "💭",
                  title: "Emotional Decision Making",
                  desc: "Learn to manage fear and greed in realistic high-pressure scenarios.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-3xl">{item.icon}</div>
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                  </div>
                  <p className="text-gray-300 pl-12">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Right column - learning tracks */}
            <div className="space-y-8">
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-amber-500/30 transition-all">
                <div className="text-4xl mb-3">📘</div>
                <h3 className="text-2xl font-bold mb-3">Foundational</h3>
                <p className="text-gray-300">
                  Master budgeting, taxes, and credit basics through interactive modules that reward
                  your consistent progress.
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs">
                    Beginner
                  </span>
                  <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs">
                    6 Modules
                  </span>
                </div>
              </div>
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-amber-500/30 transition-all">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="text-2xl font-bold mb-3">Advanced Strategy</h3>
                <p className="text-gray-300">
                  Dive deep into asset allocation, diversification, and market analysis with our
                  advanced curriculum and AI insights.
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                    Advanced
                  </span>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                    AI-Powered
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-World Gold Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-black/40 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">
              Real-World Gold
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your dedication to financial literacy pays off. Redeem your hard-earned XP for premium
              gold perks and fintech partner benefits.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: "🔓", title: "Premium Access", desc: "Unlock exclusive tools and advanced features" },
              { icon: "🎖️", title: "Elite Badges", desc: "Showcase your expertise with rare collectible badges" },
              { icon: "🤝", title: "Partner Perks", desc: "Exclusive discounts and benefits from fintech partners" },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/learner/rewards"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold hover:shadow-lg hover:shadow-amber-500/30 transition-all inline-block"
            >
              VIEW REWARD CATALOG
            </Link>
            <Link
              to="/partner/dashboard"
              className="px-8 py-3 rounded-full border-2 border-amber-500 text-amber-400 font-bold hover:bg-amber-500/10 transition-all inline-block"
            >
              GOLD REWARDS
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-4">
                FinoRise
              </h3>
              <p className="text-gray-400 text-sm">AI-driven financial mastery ecosystem</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Explore</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/learner/simulations" className="hover:text-amber-400 transition">
                    Explore Simulations
                  </Link>
                </li>
                <li>
                  <Link to="/learner/modules" className="hover:text-amber-400 transition">
                    Learn
                  </Link>
                </li>
                <li>
                  <Link to="/learner/rewards" className="hover:text-amber-400 transition">
                    Rewards
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-amber-400 transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition">
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-amber-400 transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm pt-8 border-t border-white/5">
            <p>2023 FINORISE ECOSYSTEM. ALL RIGHTS RESERVED.</p>
            <div className="flex justify-center gap-6 mt-4">
              <span className="text-gray-500">EXPLORE SIMULATIONS</span>
              <span className="text-gray-500">LEARN</span>
              <span className="text-gray-500">LEARN</span>
              <span className="text-gray-500">LEARN</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;