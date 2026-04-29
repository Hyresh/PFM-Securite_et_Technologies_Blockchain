// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

/// @title Signe - Exercice 4
/// @notice Contrat pour vérifier le signe d'un nombre
contract Signe {

    /// @notice Vérifie si un nombre est positif
    /// @param nombre Le nombre à vérifier
    /// @return true si le nombre est positif (>= 0), false sinon
    function estPositif(int nombre) public pure returns (bool) {
        return nombre >= 0;
    }
}
