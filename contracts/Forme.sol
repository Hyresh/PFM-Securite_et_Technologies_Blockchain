// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

/// @title Forme - Exercice 7 (Contrat Abstrait)
/// @notice Contrat abstrait représentant une forme géométrique générique
abstract contract Forme {
    uint public x;
    uint public y;

    /// @notice Constructeur initialisant les coordonnées
    /// @param _x Coordonnée x
    /// @param _y Coordonnée y
    constructor(uint _x, uint _y) {
        x = _x;
        y = _y;
    }

    /// @notice Déplace la forme en modifiant les coordonnées
    /// @param dx Déplacement en x
    /// @param dy Déplacement en y
    function deplacerForme(uint dx, uint dy) public {
        x += dx;
        y += dy;
    }

    /// @notice Retourne les coordonnées actuelles
    /// @return Les coordonnées x et y
    function afficheXY() public view returns (uint, uint) {
        return (x, y);
    }

    /// @notice Retourne les informations de la forme (virtuelle pure)
    /// @return Message d'information
    function afficheInfos() public pure virtual returns (string memory) {
        return "Je suis une forme";
    }

    /// @notice Calcule la surface de la forme (virtuelle)
    /// @return La surface
    function surface() public view virtual returns (uint);
}
