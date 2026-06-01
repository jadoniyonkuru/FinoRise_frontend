const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-xl text-blue-500">
          FinoRise
        </h1>

        <div className="hidden md:flex gap-8">
          <a href="#">Features</a>
          <a href="#">Learning</a>
          <a href="#">Rewards</a>
        </div>

        <button className="bg-blue-500 text-white px-5 py-2 rounded-xl">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;