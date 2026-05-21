import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="max-w-xl text-lg text-slate-600">
        The page you are looking for cannot be found. Please check the URL or
        return to the home page.
      </p>
      <Link
        to="/"
        className="rounded-md bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-700"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
