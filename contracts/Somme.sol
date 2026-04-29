// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

/// @title Somme - Exercice 1
/// @notice Contrat avec deux variables d'état et deux fonctions d'addition
contract Somme {
    uint public a;
    uint public b;

    /// @notice Constructeur initialisant les deux variables d'état
    /// @param _a Première valeur
    /// @param _b Deuxième valeur
    constructor(uint _a, uint _b) {
        a = _a;
        b = _b;
    }

    /// @notice Calcule la somme des deux variables d'état (view)
    /// @return La somme de a et b
    function addition1() public view returns (uint) {
        return a + b;
    }

    /// @notice Calcule la somme de deux nombres passés en paramètres (pure)
    /// @param _a Premier nombre
    /// @param _b Deuxième nombre
    /// @return La somme de _a et _b
    function addition2(uint _a, uint _b) public pure returns (uint) {
        return _a + _b;
    }
}
