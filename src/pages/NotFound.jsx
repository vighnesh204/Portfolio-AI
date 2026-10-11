// 404 catch-all page.

import { useOutletContext } from 'react-router-dom';

function NotFound() {
  const { onNavigate } = useOutletContext();

  const handleHomeClick = (e) => {
    e.preventDefault();
    onNavigate('/');
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <p className="text-white/30 tracking-widest text-sm">404</p>
      <h1 className="text-4xl font-bold tracking-widest">PAGE NOT FOUND</h1>
      <a
        href="/"
        onClick={handleHomeClick}
        className="text-white/50 tracking-widest text-sm underline underline-offset-4 hover:text-white transition-colors"
      >
        BACK HOME
      </a>
    </main>
  );
}

export default NotFound;
