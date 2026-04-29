import React, { useState, useEffect } from 'react';

function BlockchainInfo({ web3, account, contractAddress }) {
  const [blockInfo, setBlockInfo] = useState(null);
  const [networkId, setNetworkId] = useState('');

  useEffect(() => {
    const fetchInfo = async () => {
      if (!web3) return;
      try {
        const netId = await web3.eth.net.getId();
        setNetworkId(netId.toString());
        const latestBlockNumber = await web3.eth.getBlockNumber();
        const block = await web3.eth.getBlock(latestBlockNumber);
        setBlockInfo(block);
      } catch (err) {
        console.error('Erreur BlockchainInfo:', err);
      }
    };

    fetchInfo();
    const interval = setInterval(fetchInfo, 10000);
    return () => clearInterval(interval);
  }, [web3]);

  const providerUrl = web3?.currentProvider?.host || web3?.currentProvider?.url || 'MetaMask';

  return (
    <div className="card">
      <div className="card-title">Blockchain</div>
      <div className="info-grid">
        <div className="info-item">
          <div className="info-label">Provider</div>
          <div className="info-value">{providerUrl}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Network ID</div>
          <div className="info-value">{networkId || '—'}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Contrat</div>
          <div className="info-value">{contractAddress || '—'}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Compte</div>
          <div className="info-value">{account || '—'}</div>
        </div>
        {blockInfo && (
          <>
            <div className="info-item">
              <div className="info-label">Bloc</div>
              <div className="info-value">#{blockInfo.number?.toString()}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Hash</div>
              <div className="info-value">{blockInfo.hash}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Timestamp</div>
              <div className="info-value">
                {new Date(Number(blockInfo.timestamp) * 1000).toLocaleString()}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Transactions</div>
              <div className="info-value">{blockInfo.transactions?.length || 0}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BlockchainInfo;
