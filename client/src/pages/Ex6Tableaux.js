import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionInfo from '../components/TransactionInfo';
import TableauxABI from '../contracts/Tableaux.json';

function Ex6Tableaux({ web3, account }) {
  const [contract, setContract] = useState(null);
  const [contractAddress, setContractAddress] = useState('');
  const [txInfo, setTxInfo] = useState(null);
  const [addInput, setAddInput] = useState('');
  const [getIndex, setGetIndex] = useState('');
  const [getResult, setGetResult] = useState('');
  const [tableau, setTableau] = useState([]);
  const [somme, setSomme] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (!web3) return;
      try {
        const netId = await web3.eth.net.getId();
        const deployedNetwork = TableauxABI.networks[netId];
        if (deployedNetwork) {
          const instance = new web3.eth.Contract(TableauxABI.abi, deployedNetwork.address);
          setContract(instance);
          setContractAddress(deployedNetwork.address);
          await refreshTableau(instance);
        }
      } catch (err) { setError('Erreur de chargement du contrat: ' + err.message); }
    };
    init();
  }, [web3, refreshTableau]);

  const refreshTableau = async (c) => {
    const inst = c || contract;
    if (!inst) return;
    try {
      const arr = await inst.methods.afficheTableau().call();
      setTableau(arr.map((n) => n.toString()));
      const s = await inst.methods.calculerSomme().call();
      setSomme(s.toString());
    } catch (err) { console.error(err); }
  };

  const handleAjouter = async () => {
    setError('');
    if (!contract) { setError('Contrat non chargé.'); return; }
    setLoading(true);
    try {
      const tx = await contract.methods.ajouterNombre(addInput).send({ from: account });
      setTxInfo(tx);
      setAddInput('');
      await refreshTableau();
    } catch (err) { setError(err.message); }
    setLoading(false);
  };

  const handleGetElement = async () => {
    setError('');
    if (!contract) { setError('Contrat non chargé.'); return; }
    try {
      const result = await contract.methods.getElement(getIndex).call();
      setGetResult(result.toString());
    } catch (err) { setError(err.message); }
  };

  return (
    <div className="exercise-page">
      <div className="page-header">
        <Link to="/" className="back-link">&larr; Retour</Link>
        <span className="exercise-badge">Exercice 6</span>
        <h1>Tableaux Dynamiques</h1>
      </div>
      <div className="content-grid">
        <div>
          <div className="card">
            <div className="card-title">ajouterNombre(uint)</div>
            <div className="form-group">
              <label className="form-label">Nombre à ajouter</label>
              <input type="number" className="form-input" placeholder="42" min="0" value={addInput} onChange={(e) => setAddInput(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={handleAjouter} disabled={loading}>
              {loading && <span className="loading-spinner" />}Ajouter
            </button>
          </div>
          <div className="card">
            <div className="card-title">getElement(index)</div>
            <div className="form-group">
              <label className="form-label">Index</label>
              <input type="number" className="form-input" placeholder="0" min="0" value={getIndex} onChange={(e) => setGetIndex(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={handleGetElement}>Lire</button>
            {getResult && (
              <div className="result-box success">
                <span className="result-label">Valeur</span>
                <span className="result-value">{getResult}</span>
              </div>
            )}
          </div>
          <div className="card">
            <div className="card-title">afficheTableau()</div>
            {tableau.length > 0 ? (
              <div className="array-display">
                {tableau.map((val, i) => (<span key={i} className="array-item">[{i}] {val}</span>))}
              </div>
            ) : (<div className="no-data">Le tableau est vide.</div>)}
          </div>
          <div className="card">
            <div className="card-title">calculerSomme()</div>
            <div className="result-box success" style={{ marginTop: 0 }}>
              <span className="result-label">Somme</span>
              <span className="result-value">{somme || '0'}</span>
            </div>
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

export default Ex6Tableaux;
