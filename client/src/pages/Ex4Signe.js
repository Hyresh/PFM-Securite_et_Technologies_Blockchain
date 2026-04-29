import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionInfo from '../components/TransactionInfo';
import SigneABI from '../contracts/Signe.json';

function Ex4Signe({ web3, account }) {
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
        const deployedNetwork = SigneABI.networks[netId];
        if (deployedNetwork) {
          const instance = new web3.eth.Contract(SigneABI.abi, deployedNetwork.address);
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
    if (!contract) { setError('Contrat non chargé. Vérifiez votre connexion à Ganache.'); return; }
    try {
      const res = await contract.methods.estPositif(inputNumber).call();
      setResult(res);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="exercise-page">
      <div className="page-header">
        <Link to="/" className="back-link">&larr; Retour</Link>
        <span className="exercise-badge">Exercice 4</span>
        <h1>Signe d'un Nombre</h1>
      </div>

      <div className="content-grid">
        <div>
          <div className="card">
            <div className="card-title">estPositif(int)</div>
            <div className="form-group">
              <label className="form-label">Nombre (entier signé)</label>
              <input
                type="number"
                className="form-input"
                placeholder="-5"
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleCheck}>
              Vérifier
            </button>
            {result !== null && (
              <div className={`result-box ${result ? 'success' : 'error'}`}>
                <span className="result-label">Résultat</span>
                <span className="result-value">
                  {result
                    ? `${inputNumber} est positif (ou zéro)`
                    : `${inputNumber} est négatif`}
                </span>
              </div>
            )}
          </div>

          {error && (
            <div className="result-box error">
              <span className="result-value">{error}</span>
            </div>
          )}
        </div>

        <div>
          <BlockchainInfo web3={web3} account={account} contractAddress={contractAddress} />
          <TransactionInfo txInfo={txInfo} />
        </div>
      </div>
    </div>
  );
}

export default Ex4Signe;
