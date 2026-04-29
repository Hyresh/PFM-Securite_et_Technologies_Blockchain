import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/ex1', label: 'Somme', num: '01' },
  { path: '/ex2', label: 'Conversion', num: '02' },
  { path: '/ex3', label: 'Gestion Chaînes', num: '03' },
  { path: '/ex4', label: 'Signe', num: '04' },
  { path: '/ex5', label: 'Parité', num: '05' },
  { path: '/ex6', label: 'Tableaux', num: '06' },
  { path: '/ex7', label: 'POO (Héritage)', num: '07' },
  { path: '/ex8', label: 'Payment', num: '08' },
];

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-[260px] bg-gradient-to-b from-[#001f2f] to-[#003049] border-r border-steel-blue/30 flex flex-col z-[100] shadow-2xl">
      <Link to="/" className="flex items-center gap-3 p-6 border-b border-steel-blue/20 group hover:bg-steel-blue/10 transition-colors duration-300">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brick-red to-molten-lava flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-deep-space-blue" width="20" height="20">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-papaya-whip tracking-tight leading-tight">Blockchain DApp</span>
          <span className="text-xs font-normal text-brick-red mt-0.5">Projet de Fin de Module</span>
        </div>
      </Link>

      <nav className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar">
        <div className="text-xs font-bold text-steel-blue uppercase tracking-widest px-3 mb-2">Navigation</div>
        <Link
          to="/"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 mb-6 ${location.pathname === '/' ? 'bg-steel-blue/20 text-brick-red shadow-inner' : 'text-papaya-whip/70 hover:bg-steel-blue/10 hover:text-papaya-whip hover:translate-x-1'}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 transition-all duration-300 ${location.pathname === '/' ? 'text-brick-red opacity-100' : 'opacity-60'}`}>
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          Contrats
        </Link>

        <div className="text-xs font-bold text-steel-blue uppercase tracking-widest px-3 mb-2">Exercices</div>
        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${isActive ? 'bg-steel-blue/20 text-brick-red shadow-inner' : 'text-papaya-whip/70 hover:bg-steel-blue/10 hover:text-papaya-whip hover:translate-x-1'}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 transition-all duration-300 ${isActive ? 'text-brick-red opacity-100' : 'opacity-60'}`}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                {item.label}
                <span className={`ml-auto text-xs font-bold ${isActive ? 'text-molten-lava' : 'text-steel-blue'} min-w-[20px] text-right`}>{item.num}</span>
              </Link>
            );
          })}
        </div>
      </nav>

    </aside>
  );
}

export default Sidebar;
