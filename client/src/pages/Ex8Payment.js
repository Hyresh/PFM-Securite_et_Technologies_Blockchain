import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionInfo from '../components/TransactionInfo';
import PaymentABI from '../contracts/Payment.json';

function Ex8Payment({ web3, account }) {
  const [contract, setContract] = useState(null);
  const [contractAddress, setContractAddress] = useState('');
  const [txInfo, setTxInfo] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [balance, setBalance] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const init = async () => {
      if (!web3) return;
      try {
        const netId = await web3.eth.net.getId();
        const deployedNetwork = PaymentABI.networks[netId];
        if (deployedNetwork) {
          const instance = new web3.eth.Contract(PaymentABI.abi, deployedNetwork.address);
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
      const r = await inst.methods.recipient().call();
      setRecipient(r);
      const b = await inst.methods.getBalance().call();
      setBalance(b.toString());
    } catch (err) { console.error(err); }
  };

  const handleSendPayment = async () => {
    setError(''); setSuccessMsg('');
    if (!contract) { setError('Contrat non chargé.'); return; }
    setLoading(true);
    try {
      const weiAmount = web3.utils.toWei(sendAmount, 'ether');
      const tx = await contract.methods.receivePayment().send({ from: account, value: weiAmount });
      setTxInfo(tx);
      setSuccessMsg(`${sendAmount} ETH envoyé avec succès.`);
      setSendAmount('');
      await refreshData();
    } catch (err) { setError(err.message); }
    setLoading(false);
  };

  const handleWithdraw = async () => {
    setError(''); setSuccessMsg('');
    if (!contract) { setError('Contrat non chargé.'); return; }
    setLoading(true);
    try {
      const tx = await contract.methods.withdraw().send({ from: account });
      setTxInfo(tx);
      setSuccessMsg('Fonds retirés avec succès.');
      await refreshData();
    } catch (err) { setError(err.message); }
    setLoading(false);
  };

  const balanceInEth = web3 && balance ? web3.utils.fromWei(balance, 'ether') : '0';

  return (
    <div className="exercise-page">
      <div className="page-header">
        <Link to="/" className="back-link">&larr; Retour</Link>
        <span className="exercise-badge">Exercice 8</span>
        <h1>Payment</h1>
      </div>
      <div className="content-grid">
        <div>
          <div className="card">
            <div className="card-title">Informations du Contrat</div>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">Recipient</div>
                <div className="info-value">{recipient || '—'}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Solde du Contrat</div>
                <div className="info-value">{balanceInEth} ETH</div>
              </div>
              <div className="info-item">
                <div className="info-label">Votre Adresse</div>
                <div className="info-value">{account || '—'}</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-title">receivePayment() &mdash; payable</div>
            <div className="form-group">
              <label className="form-label">Montant (Ether)</label>
              <input type="number" className="form-input" placeholder="0.5" step="0.01" min="0" value={sendAmount} onChange={(e) => setSendAmount(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={handleSendPayment} disabled={loading}>
              {loading && <span className="loading-spinner" />}Envoyer
            </button>
          </div>
          <div className="card">
            <div className="card-title">withdraw() &mdash; recipient uniquement</div>
            <p style={{ fontSize: '0.79rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Réservé au recipient ({recipient ? `${recipient.substring(0, 10)}...` : '—'}).
            </p>
            <button className="btn btn-danger" onClick={handleWithdraw} disabled={loading}>
              {loading && <span className="loading-spinner" />}Retirer les fonds
            </button>
          </div>
          {successMsg && (<div className="result-box success"><span className="result-value">{successMsg}</span></div>)}
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

export default Ex8Payment;
