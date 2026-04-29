// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

/// @title Payment - Exercice 8
/// @notice Contrat utilisant les variables globales msg.sender et msg.value
contract Payment {
    address public recipient;

    /// @notice Constructeur initialisant l'adresse du destinataire
    /// @param _recipient L'adresse du destinataire
    constructor(address _recipient) {
        recipient = _recipient;
    }

    /// @notice Fonction payable pour recevoir des Ethers
    /// @dev Utilise require pour vérifier que msg.value > 0
    function receivePayment() public payable {
        require(msg.value > 0, "Le montant envoye doit etre superieur a 0");
    }

    /// @notice Fonction de retrait réservée au destinataire
    /// @dev Transfère tout le solde du contrat au recipient
    function withdraw() public {
        require(msg.sender == recipient, "Seul le destinataire peut retirer les fonds");
        payable(recipient).transfer(address(this).balance);
    }

    /// @notice Retourne le solde actuel du contrat
    /// @return Le solde en Wei
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
