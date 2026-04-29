// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

/// @title Parite - Exercice 5
/// @notice Contrat pour vérifier la parité d'un nombre
contract Parite {

    /// @notice Vérifie si un nombre est pair
    /// @param nombre Le nombre à vérifier
    /// @return true si le nombre est pair, false sinon
    function estPair(uint nombre) public pure returns (bool) {
        return nombre % 2 == 0;
    }
}
