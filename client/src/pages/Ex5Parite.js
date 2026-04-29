import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionInfo from '../components/TransactionInfo';
import PariteABI from '../contracts/Parite.json';

function Ex5Parite({ web3, account }) {
  const [contract, setContract] = useState(null);
  const [contractAddress, setContractAddress] = useState('');
  const [txInfo] = useState(null);
  const [inputNumber, setInputNumber] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const init = async () => {
      if (!web3) return;
      try {
        const netId = await web3.eth.net.getId();
        const deployedNetwork = PariteABI.networks[netId];
        if (deployedNetwork) {
          const instance = new web3.eth.Contract(PariteABI.abi, deployedNetwork.address);
          setContract(instance);
          setContractAddress(deployedNetwork.address);
        }
      } catch (err) {
        setError('Erreur de chargement du contrat: ' + err.message);
      }
    };
    init();
  }, [web3]);

  const handleCheck = async () => {
    setError('');
    if (!contract) { setError('Contrat non chargé.'); return; }
    try {
      const res = await contract.methods.estPair(inputNumber).call();
      setResult(res);
    } catch (err) { setError(err.message); }
  };

  return (
    <div className="exercise-page">
      <div className="page-header">
        <Link to="/" className="back-link">&larr; Retour</Link>
        <span className="exercise-badge">Exercice 5</span>
        <h1>Parité</h1>
      </div>
      <div className="content-grid">
        <div>
          <div className="card">
            <div className="card-title">estPair(uint)</div>
            <div className="form-group">
              <label className="form-label">Nombre (entier non signé)</label>
              <input type="number" className="form-input" placeholder="42" min="0" value={inputNumber} onChange={(e) => setInputNumber(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={handleCheck}>Vérifier</button>
            {result !== null && (
              <div className={`result-box ${result ? 'success' : 'error'}`}>
                <span className="result-label">Résultat</span>
                <span className="result-value">{result ? `${inputNumber} est pair` : `${inputNumber} est impair`}</span>
              </div>
            )}
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

export default Ex5Parite;
