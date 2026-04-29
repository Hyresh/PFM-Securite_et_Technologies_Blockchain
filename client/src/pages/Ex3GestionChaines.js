import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionInfo from '../components/TransactionInfo';
import GestionChainesABI from '../contracts/GestionChaines.json';

function Ex3GestionChaines({ web3, account }) {
  const [contract, setContract] = useState(null);
  const [contractAddress, setContractAddress] = useState('');
  const [txInfo, setTxInfo] = useState(null);

  const [message, setMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [concatA, setConcatA] = useState('');
  const [concatB, setConcatB] = useState('');
  const [concatResult, setConcatResult] = useState('');
  const [concatAvecInput, setConcatAvecInput] = useState('');
  const [concatAvecResult, setConcatAvecResult] = useState('');
  const [longueurInput, setLongueurInput] = useState('');
  const [longueurResult, setLongueurResult] = useState('');
  const [compareS1, setCompareS1] = useState('');
  const [compareS2, setCompareS2] = useState('');
  const [compareResult, setCompareResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (!web3) return;
      try {
        const netId = await web3.eth.net.getId();
        const deployedNetwork = GestionChainesABI.networks[netId];
        if (deployedNetwork) {
          const instance = new web3.eth.Contract(GestionChainesABI.abi, deployedNetwork.address);
          setContract(instance);
          setContractAddress(deployedNetwork.address);
          const msg = await instance.methods.getMessage().call();
          setMessage(msg);
        }
      } catch (err) {
        setError('Erreur de chargement du contrat: ' + err.message);
      }
    };
    init();
  }, [web3]);

  const handleSetMessage = async () => {
    setError('');
    if (!contract) { setError('Contrat non chargé. Vérifiez votre connexion à Ganache.'); return; }
    setLoading(true);
    try {
      const tx = await contract.methods.setMessage(newMessage).send({ from: account });
      setTxInfo(tx);
      const msg = await contract.methods.getMessage().call();
      setMessage(msg);
      setNewMessage('');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleGetMessage = async () => {
    setError('');
    if (!contract) { setError('Contrat non chargé. Vérifiez votre connexion à Ganache.'); return; }
    try {
      const msg = await contract.methods.getMessage().call();
      setMessage(msg);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleConcatener = async () => {
    setError('');
    if (!contract) { setError('Contrat non chargé. Vérifiez votre connexion à Ganache.'); return; }
    try {
      const result = await contract.methods.concatener(concatA, concatB).call();
      setConcatResult(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleConcatenerAvec = async () => {
    setError('');
    if (!contract) { setError('Contrat non chargé. Vérifiez votre connexion à Ganache.'); return; }
    try {
      const result = await contract.methods.concatenerAvec(concatAvecInput).call();
      setConcatAvecResult(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLongueur = async () => {
    setError('');
    if (!contract) { setError('Contrat non chargé. Vérifiez votre connexion à Ganache.'); return; }
    try {
      const result = await contract.methods.longueur(longueurInput).call();
      setLongueurResult(result.toString());
    } catch (err) {
      setError(err.message);
    }
  };

  const handleComparer = async () => {
    setError('');
    if (!contract) { setError('Contrat non chargé. Vérifiez votre connexion à Ganache.'); return; }
    try {
      const result = await contract.methods.comparer(compareS1, compareS2).call();
      setCompareResult(result);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="exercise-page">
      <div className="page-header">
        <Link to="/" className="back-link">&larr; Retour</Link>
        <span className="exercise-badge">Exercice 3</span>
        <h1>Gestion des Chaînes</h1>
      </div>

      <div className="content-grid">
        <div>
          <div className="card">
            <div className="card-title">setMessage / getMessage</div>
            <div className="result-box" style={{ marginTop: 0, marginBottom: '12px' }}>
              <span className="result-label">Actuel</span>
              <span className="result-value">{message || '(vide)'}</span>
            </div>
            <div className="form-group">
              <label className="form-label">Nouveau message</label>
              <input
                type="text"
                className="form-input"
                placeholder="Entrez un message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </div>
            <div className="btn-group">
              <button className="btn btn-primary" onClick={handleSetMessage} disabled={loading}>
                {loading && <span className="loading-spinner" />}
                setMessage()
              </button>
              <button className="btn btn-secondary" onClick={handleGetMessage}>
                getMessage()
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-title">concatener(a, b)</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Chaîne A</label>
                <input type="text" className="form-input" placeholder="Hello" value={concatA} onChange={(e) => setConcatA(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Chaîne B</label>
                <input type="text" className="form-input" placeholder=" World" value={concatB} onChange={(e) => setConcatB(e.target.value)} />
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleConcatener}>Exécuter</button>
            {concatResult && (
              <div className="result-box success">
                <span className="result-label">Résultat</span>
                <span className="result-value">{concatResult}</span>
              </div>
            )}
          </div>

          <div className="card">
            <div className="card-title">concatenerAvec(str)</div>
            <div className="form-group">
              <label className="form-label">Chaîne à ajouter au message</label>
              <input type="text" className="form-input" placeholder="..." value={concatAvecInput} onChange={(e) => setConcatAvecInput(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={handleConcatenerAvec}>Exécuter</button>
            {concatAvecResult && (
              <div className="result-box success">
                <span className="result-label">Résultat</span>
                <span className="result-value">{concatAvecResult}</span>
              </div>
            )}
          </div>

          <div className="card">
            <div className="card-title">longueur(str)</div>
            <div className="form-group">
              <label className="form-label">Chaîne</label>
              <input type="text" className="form-input" placeholder="Texte" value={longueurInput} onChange={(e) => setLongueurInput(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={handleLongueur}>Exécuter</button>
            {longueurResult && (
              <div className="result-box success">
                <span className="result-label">Longueur</span>
                <span className="result-value">{longueurResult} bytes</span>
              </div>
            )}
          </div>

          <div className="card">
            <div className="card-title">comparer(s1, s2)</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Chaîne 1</label>
                <input type="text" className="form-input" placeholder="abc" value={compareS1} onChange={(e) => setCompareS1(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Chaîne 2</label>
                <input type="text" className="form-input" placeholder="abc" value={compareS2} onChange={(e) => setCompareS2(e.target.value)} />
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleComparer}>Exécuter</button>
            {compareResult !== null && (
              <div className={`result-box ${compareResult ? 'success' : 'error'}`}>
                <span className="result-label">Résultat</span>
                <span className="result-value">{compareResult ? 'Identiques' : 'Différentes'}</span>
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

export default Ex3GestionChaines;
