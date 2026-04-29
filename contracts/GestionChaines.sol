// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

/// @title GestionChaines - Exercice 3
/// @notice Contrat pour la gestion des chaînes de caractères
contract GestionChaines {
    string public message;

    /// @notice Modifie la valeur de message
    /// @param _message La nouvelle valeur du message
    function setMessage(string memory _message) public {
        message = _message;
    }

    /// @notice Retourne la valeur de message
    /// @return La valeur actuelle du message
    function getMessage() public view returns (string memory) {
        return message;
    }

    /// @notice Concatène deux chaînes passées en paramètres
    /// @param a Première chaîne
    /// @param b Deuxième chaîne
    /// @return Le résultat de la concaténation
    function concatener(string memory a, string memory b) public pure returns (string memory) {
        return string.concat(a, b);
    }

    /// @notice Concatène message avec une autre chaîne
    /// @param s La chaîne à concaténer avec message
    /// @return Le résultat de la concaténation
    function concatenerAvec(string memory s) public view returns (string memory) {
        return string.concat(message, s);
    }

    /// @notice Retourne la longueur d'une chaîne
    /// @param s La chaîne dont on veut la longueur
    /// @return La longueur de la chaîne en bytes
    function longueur(string memory s) public pure returns (uint) {
        return bytes(s).length;
    }

    /// @notice Compare deux chaînes de caractères
    /// @param s1 Première chaîne
    /// @param s2 Deuxième chaîne
    /// @return true si les chaînes sont identiques, false sinon
    function comparer(string memory s1, string memory s2) public pure returns (bool) {
        return keccak256(abi.encodePacked(s1)) == keccak256(abi.encodePacked(s2));
    }
}
