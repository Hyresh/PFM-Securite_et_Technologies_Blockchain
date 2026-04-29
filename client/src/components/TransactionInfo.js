import React from 'react';

function TransactionInfo({ txInfo }) {
  if (!txInfo) {
    return (
      <div className="card">
        <div className="card-title">Dernière Transaction</div>
        <div className="no-data">Aucune transaction effectuée.</div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-title">Dernière Transaction</div>
      <div className="tx-details">
        <div className="tx-row">
          <span className="tx-label">Hash</span>
          <span className="tx-value">{txInfo.transactionHash || '—'}</span>
        </div>
        <div className="tx-row">
          <span className="tx-label">De</span>
          <span className="tx-value">{txInfo.from || '—'}</span>
        </div>
        <div className="tx-row">
          <span className="tx-label">Vers</span>
          <span className="tx-value">{txInfo.to || '—'}</span>
        </div>
        <div className="tx-row">
          <span className="tx-label">Gas</span>
          <span className="tx-value">{txInfo.gasUsed?.toString() || '—'}</span>
        </div>
        <div className="tx-row">
          <span className="tx-label">Statut</span>
          <span className="tx-value">
            {txInfo.status ? (
              <span className="tx-status success">Succès</span>
            ) : (
              <span className="tx-status failed">Échec</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TransactionInfo;
