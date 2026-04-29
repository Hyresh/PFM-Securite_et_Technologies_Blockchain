import React from 'react';

function Topbar({ account, networkId }) {
  const shortAddress = account
    ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
    : '';

  return (
    <header className="sticky top-0 z-50 bg-[#001f2f]/80 backdrop-blur-xl border-b border-steel-blue/30 px-8 h-16 flex items-center justify-end gap-5 shadow-sm">
      {networkId && (
        <span className="text-xs font-semibold text-steel-blue bg-steel-blue/10 border border-steel-blue/20 px-3 py-1.5 rounded-full shadow-inner">
          Réseau {networkId}
        </span>
      )}
      <div className="flex items-center gap-3 bg-deep-space-blue/50 border border-steel-blue/30 px-3 py-1.5 rounded-full shadow-inner transition-colors duration-300 hover:bg-deep-space-blue/70">
        <span className={`w-2 h-2 rounded-full shadow-sm animate-pulse ${account ? 'bg-brick-red shadow-brick-red/50' : 'bg-molten-lava shadow-molten-lava/50'}`} />
        {account ? (
          <span className="text-sm font-mono font-medium text-papaya-whip/90 tracking-wider" title={account}>
            {shortAddress}
          </span>
        ) : (
          <span className="text-sm font-medium text-papaya-whip/60">Non connecté</span>
        )}
      </div>
    </header>
  );
}

export default Topbar;
