// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

/// @title Tableaux - Exercice 6
/// @notice Contrat pour stocker une liste de nombres et calculer leur somme
contract Tableaux {
    uint[] public nombres;

    /// @notice Constructeur initialisant le tableau
    constructor() {
        // Le tableau est initialisé vide
    }

    /// @notice Ajoute un nombre au tableau
    /// @param _nombre Le nombre à ajouter
    function ajouterNombre(uint _nombre) public {
        nombres.push(_nombre);
    }

    /// @notice Retourne l'élément à l'indice donné
    /// @param index L'indice de l'élément
    /// @return L'élément à l'indice spécifié
    function getElement(uint index) public view returns (uint) {
        require(index < nombres.length, "Index hors limites : l'index n'existe pas dans le tableau");
        return nombres[index];
    }

    /// @notice Retourne le tableau complet
    /// @return Le tableau de nombres
    function afficheTableau() public view returns (uint[] memory) {
        return nombres;
    }

    /// @notice Calcule et retourne la somme de tous les nombres du tableau
    /// @return La somme totale
    function calculerSomme() public view returns (uint) {
        uint somme = 0;
        for (uint i = 0; i < nombres.length; i++) {
            somme += nombres[i];
        }
        return somme;
    }
}
