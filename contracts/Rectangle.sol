// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./Forme.sol";

/// @title Rectangle - Exercice 7 (Contrat Concret)
/// @notice Contrat concret héritant de Forme, représentant un rectangle
contract Rectangle is Forme {
    uint public lo; // longueur
    uint public la; // largeur

    /// @notice Constructeur prenant 4 paramètres
    /// @param _x Coordonnée x
    /// @param _y Coordonnée y
    /// @param _lo Longueur du rectangle
    /// @param _la Largeur du rectangle
    constructor(uint _x, uint _y, uint _lo, uint _la) Forme(_x, _y) {
        lo = _lo;
        la = _la;
    }

    /// @notice Calcule la surface du rectangle
    /// @return La surface (longueur × largeur)
    function surface() public view override returns (uint) {
        return lo * la;
    }

    /// @notice Redéfinition de afficheInfos
    /// @return Le message "Je suis Rectangle"
    function afficheInfos() public pure override returns (string memory) {
        return "Je suis Rectangle";
    }

    /// @notice Retourne la longueur et la largeur
    /// @return La longueur et la largeur du rectangle
    function afficheLoLa() public view returns (uint, uint) {
        return (lo, la);
    }
}
