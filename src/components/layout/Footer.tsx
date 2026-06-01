const Footer = () => {
  return (
    <footer className="border-t py-12 px-6">
      <div className="max-w-7xl mx-auto flex justify-between flex-wrap gap-6">
        <div>
          <h2 className="font-bold text-xl text-blue-500">
            FinoRise
          </h2>

          <p className="text-gray-500 mt-2">
            Financial literacy through immersive learning.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Platform</h4>
          <ul className="space-y-2 mt-3 text-gray-500">
            <li>Features</li>
            <li>Learning</li>
            <li>Rewards</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;