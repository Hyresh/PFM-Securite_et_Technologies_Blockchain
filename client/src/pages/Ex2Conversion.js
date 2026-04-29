import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionInfo from '../components/TransactionInfo';
import ConversionABI from '../contracts/Conversion.json';

function Ex2Conversion({ web3, account }) {
  const [contract, setContract] = useState(null);
  const [contractAddress, setContractAddress] = useState('');
  const [txInfo] = useState(null);

  const [ethToWeiInput, setEthToWeiInput] = useState('');
  const [weiToEthInput, setWeiToEthInput] = useState('');
  const [resultEthToWei, setResultEthToWei] = useState('');
  const [resultWeiToEth, setResultWeiToEth] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const init = async () => {
      if (!web3) return;
      try {
        const netId = await web3.eth.net.getId();
        const deployedNetwork = ConversionABI.networks[netId];
        if (deployedNetwork) {
          const instance = new web3.eth.Contract(ConversionABI.abi, deployedNetwork.address);
          setContract(instance);
          setContractAddress(deployedNetwork.address);
        }
      } catch (err) {
        setError('Erreur de chargement du contrat: ' + err.message);
      }
    };
    init();
  }, [web3]);

  const handleEtherToWei = async () => {
    setError('');
    if (!contract) { setError('Contrat non chargé. Vérifiez votre connexion à Ganache.'); return; }
    try {
      const result = await contract.methods.etherEnWei(ethToWeiInput).call();
      setResultEthToWei(result.toString());
    } catch (err) {
      setError(err.message);
    }
  };

  const handleWeiToEther = async () => {
    setError('');
    if (!contract) { setError('Contrat non chargé. Vérifiez votre connexion à Ganache.'); return; }
    try {
      const result = await contract.methods.weiEnEther(weiToEthInput).call();
      setResultWeiToEth(result.toString());
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="exercise-page">
      <div className="page-header">
        <Link to="/" className="back-link">&larr; Retour</Link>
        <span className="exercise-badge">Exercice 2</span>
        <h1>Conversion Ether / Wei</h1>
      </div>

      <div className="content-grid">
        <div>
          <div className="card">
            <div className="card-title">etherEnWei() &mdash; Ether vers Wei</div>
            <div className="form-group">
              <label className="form-label">Montant en Ether</label>
              <input
                type="number"
                className="form-input"
                placeholder="1"
                value={ethToWeiInput}
                onChange={(e) => setEthToWeiInput(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleEtherToWei}>
              Convertir
            </button>
            {resultEthToWei && (
              <div className="result-box success">
                <span className="result-label">Wei</span>
                <span className="result-value">{resultEthToWei}</span>
              </div>
            )}
          </div>

          <div className="card">
            <div className="card-title">weiEnEther() &mdash; Wei vers Ether</div>
            <div className="form-group">
              <label className="form-label">Montant en Wei</label>
              <input
                type="number"
                className="form-input"
                placeholder="1000000000000000000"
                value={weiToEthInput}
                onChange={(e) => setWeiToEthInput(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleWeiToEther}>
              Convertir
            </button>
            {resultWeiToEth && (
              <div className="result-box success">
                <span className="result-label">Ether</span>
                <span className="result-value">{resultWeiToEth}</span>
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

export default Ex2Conversion;
