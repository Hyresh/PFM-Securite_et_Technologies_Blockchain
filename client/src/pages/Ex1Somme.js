import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionInfo from '../components/TransactionInfo';
import SommeABI from '../contracts/Somme.json';

function Ex1Somme({ web3, account }) {
  const [contract, setContract] = useState(null);
  const [contractAddress, setContractAddress] = useState('');
  const [txInfo] = useState(null);

  const [stateA, setStateA] = useState('');
  const [stateB, setStateB] = useState('');
  const [resultAdd1, setResultAdd1] = useState('');

  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
  const [resultAdd2, setResultAdd2] = useState('');

  const [error, setError] = useState('');

  useEffect(() => {
    const init = async () => {
      if (!web3) return;
      try {
        const netId = await web3.eth.net.getId();
        const deployedNetwork = SommeABI.networks[netId];
        if (deployedNetwork) {
          const instance = new web3.eth.Contract(SommeABI.abi, deployedNetwork.address);
          setContract(instance);
          setContractAddress(deployedNetwork.address);

          const a = await instance.methods.a().call();
          const b = await instance.methods.b().call();
          setStateA(a.toString());
          setStateB(b.toString());
        }
      } catch (err) {
        setError('Erreur de chargement du contrat: ' + err.message);
      }
    };
    init();
  }, [web3]);

  const handleAddition1 = async () => {
    setError('');
    if (!contract) { setError('Contrat non chargé. Vérifiez votre connexion à Ganache.'); return; }
    try {
      const result = await contract.methods.addition1().call();
      setResultAdd1(result.toString());
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddition2 = async () => {
    setError('');
    if (!contract) { setError('Contrat non chargé. Vérifiez votre connexion à Ganache.'); return; }
    try {
      const result = await contract.methods.addition2(inputA, inputB).call();
      setResultAdd2(result.toString());
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="exercise-page">
      <div className="page-header">
        <Link to="/" className="back-link">&larr; Retour</Link>
        <span className="exercise-badge">Exercice 1</span>
        <h1>Somme</h1>
      </div>

      <div className="content-grid">
        <div>
          <div className="card">
            <div className="card-title">addition1() &mdash; view</div>
            <p style={{ fontSize: '0.79rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Calcule la somme des variables d'état a={stateA} et b={stateB}.
            </p>
            <button className="btn btn-primary" onClick={handleAddition1}>
              Exécuter
            </button>
            {resultAdd1 && (
              <div className="result-box success">
                <span className="result-label">Résultat</span>
                <span className="result-value">{resultAdd1}</span>
              </div>
            )}
          </div>

          <div className="card">
            <div className="card-title">addition2(a, b) &mdash; pure</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Valeur a</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="5"
                  value={inputA}
                  onChange={(e) => setInputA(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Valeur b</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="10"
                  value={inputB}
                  onChange={(e) => setInputB(e.target.value)}
                />
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleAddition2}>
              Exécuter
            </button>
            {resultAdd2 && (
              <div className="result-box success">
                <span className="result-label">Résultat</span>
                <span className="result-value">{resultAdd2}</span>
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

export default Ex1Somme;
