import { NavLink, Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 px-6 py-4 shadow-sm backdrop-blur-sm">
        <nav className="flex items-center justify-between gap-4 max-w-6xl mx-auto">
          <div className="text-lg font-semibold">FinoRise</div>
          <div className="flex items-center gap-4 text-slate-600">
            <NavLink
              to="/"
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "font-semibold text-slate-900" : "hover:text-slate-900"
              }
            >
              Home
            </NavLink>
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
