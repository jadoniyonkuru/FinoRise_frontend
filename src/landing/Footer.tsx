export default function Footer() {
  return (
    <footer className="bg-[#0a0f1c] py-12 border-t border-white/5">
      <div className="max-w-[1320px] mx-auto px-4 text-center">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} FinoRise Ecosystem. All rights reserved. Mastering the intersection of behavior and mastery.
        </p>
      </div>
    </footer>
  );
}