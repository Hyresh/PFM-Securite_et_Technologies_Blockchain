import React from 'react';
import { Link } from 'react-router-dom';

const exercises = [
  {
    num: '01',
    title: 'Somme',
    desc: 'Opérations arithmétiques avec variables d\'état et fonctions view/pure.',
    path: '/ex1',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Conversion',
    desc: 'Conversion bidirectionnelle entre unités Ether et Wei.',
    path: '/ex2',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Gestion des Chaînes',
    desc: 'Manipulation de chaînes de caractères on-chain.',
    path: '/ex3',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Signe',
    desc: 'Vérification du signe d\'un entier signé via estPositif().',
    path: '/ex4',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Parité',
    desc: 'Test de parité sur un entier non signé via estPair().',
    path: '/ex5',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="9" x2="20" y2="9" />
        <line x1="4" y1="15" x2="20" y2="15" />
        <line x1="10" y1="3" x2="8" y2="21" />
        <line x1="16" y1="3" x2="14" y2="21" />
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Tableaux',
    desc: 'Tableau dynamique on-chain avec ajout, lecture et somme.',
    path: '/ex6',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="15" y1="3" x2="15" y2="21" />
      </svg>
    ),
  },
  {
    num: '07',
    title: 'POO (Héritage)',
    desc: 'Contrat Rectangle héritant de Forme avec calcul de surface.',
    path: '/ex7',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
        <line x1="12" y1="22" x2="12" y2="15.5" />
        <polyline points="22 8.5 12 15.5 2 8.5" />
      </svg>
    ),
  },
  {
    num: '08',
    title: 'Payment',
    desc: 'Fonctions payable avec msg.sender, msg.value et withdraw.',
    path: '/ex8',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

function Home() {
  return (
    <div className="animate-[fadeIn_0.4s_ease-out] w-full max-w-6xl mx-auto">
      <div className="mb-10 text-center md:text-left">
        <div className="inline-block w-16 h-1.5 bg-gradient-to-r from-brick-red to-molten-lava rounded-full mb-6"></div>
        <h1 className="text-4xl md:text-5xl font-bold text-papaya-whip tracking-tight mb-4 drop-shadow-md">
          Smart Contracts
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {exercises.map((ex) => (
          <Link 
            to={ex.path} 
            key={ex.num} 
            className="group relative flex flex-col gap-4 p-6 bg-gradient-to-br from-deep-space-blue to-[#001f2f] rounded-2xl border border-steel-blue/30 shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(193,18,31,0.3)] hover:-translate-y-2 hover:border-brick-red/60 transition-all duration-300 ease-out overflow-hidden"
          >
            
            <div className="absolute inset-0 bg-gradient-to-tr from-brick-red/0 via-brick-red/5 to-brick-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full border border-steel-blue bg-deep-space-blue/50 flex items-center justify-center shrink-0 group-hover:bg-brick-red group-hover:border-molten-lava group-hover:text-deep-space-blue transition-colors duration-300 text-brick-red">
                <div className="w-4 h-4 flex items-center justify-center">{ex.icon}</div>
              </div>
              <span className="text-sm font-bold text-brick-red group-hover:text-molten-lava transition-colors duration-300">{ex.num}</span>
            </div>
            
            <h3 className="text-xl font-semibold text-papaya-whip tracking-tight relative z-10">{ex.title}</h3>
            
            <p className="text-sm text-papaya-whip/60 leading-relaxed flex-1 relative z-10">{ex.desc}</p>
            
            <span className="text-papaya-whip/40 text-lg mt-auto group-hover:text-brick-red group-hover:translate-x-2 transition-all duration-300 relative z-10 flex items-center gap-2">
              Explorer <span className="text-xl">&rarr;</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
