import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionInfo from '../components/TransactionInfo';
import RectangleABI from '../contracts/Rectangle.json';

function Ex7POO({ web3, account }) {
  const [contract, setContract] = useState(null);
  const [contractAddress, setContractAddress] = useState('');
  const [txInfo, setTxInfo] = useState(null);
  const [coords, setCoords] = useState({ x: '', y: '' });
  const [dims, setDims] = useState({ lo: '', la: '' });
  const [surface, setSurface] = useState('');
  const [infos, setInfos] = useState('');
  const [dx, setDx] = useState('');
  const [dy, setDy] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (!web3) return;
      try {
        const netId = await web3.eth.net.getId();
        const deployedNetwork = RectangleABI.networks[netId];
        if (deployedNetwork) {
          const instance = new web3.eth.Contract(RectangleABI.abi, deployedNetwork.address);
          setContract(instance);
          setContractAddress(deployedNetwork.address);
          await refreshData(instance);
        }
      } catch (err) { setError('Erreur de chargement du contrat: ' + err.message); }
    };
    init();
  }, [web3, refreshData]);

  const refreshData = async (c) => {
    const inst = c || contract;
    if (!inst) return;
    try {
      const xy = await inst.methods.afficheXY().call();
      setCoords({ x: xy[0].toString(), y: xy[1].toString() });
      const lola = await inst.methods.afficheLoLa().call();
      setDims({ lo: lola[0].toString(), la: lola[1].toString() });
      const s = await inst.methods.surface().call();
      setSurface(s.toString());
      const info = await inst.methods.afficheInfos().call();
      setInfos(info);
    } catch (err) { console.error(err); }
  };

  const handleDeplacer = async () => {
    setError('');
    if (!contract) { setError('Contrat non chargé.'); return; }
    setLoading(true);
    try {
      const tx = await contract.methods.deplacerForme(dx, dy).send({ from: account });
      setTxInfo(tx);
      await refreshData();
      setDx(''); setDy('');
    } catch (err) { setError(err.message); }
    setLoading(false);
  };

  return (
    <div className="exercise-page">
      <div className="page-header">
        <Link to="/" className="back-link">&larr; Retour</Link>
        <span className="exercise-badge">Exercice 7</span>
        <h1>Rectangle (Héritage)</h1>
      </div>
      <div className="content-grid">
        <div>
          <div className="card">
            <div className="card-title">Informations du Rectangle</div>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">afficheInfos()</div>
                <div className="info-value">{infos || '—'}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Coordonnées (x, y)</div>
                <div className="info-value">({coords.x}, {coords.y})</div>
              </div>
              <div className="info-item">
                <div className="info-label">Dimensions</div>
                <div className="info-value">{dims.lo} × {dims.la}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Surface</div>
                <div className="info-value">{surface}</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-title">deplacerForme(dx, dy)</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">dx</label>
                <input type="number" className="form-input" placeholder="3" min="0" value={dx} onChange={(e) => setDx(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">dy</label>
                <input type="number" className="form-input" placeholder="5" min="0" value={dy} onChange={(e) => setDy(e.target.value)} />
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleDeplacer} disabled={loading}>
              {loading && <span className="loading-spinner" />}Déplacer
            </button>
          </div>
          {error && (<div className="result-box error"><span className="result-value">{error}</span></div>)}
        </div>
        <div>
          <BlockchainInfo web3={web3} account={account} contractAddress={contractAddress} />
          <TransactionInfo txInfo={txInfo} />
        </div>
      </div>
    </div>
  );
}

export default Ex7POO;
