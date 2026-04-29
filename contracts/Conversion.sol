// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

/// @title Conversion - Exercice 2
/// @notice Contrat de conversion entre Ether et Wei
contract Conversion {

    /// @notice Convertit un montant en Ether vers Wei
    /// @param montantEther Le montant en Ether
    /// @return Le montant équivalent en Wei
    function etherEnWei(uint montantEther) public pure returns (uint) {
        return montantEther * 1 ether;
    }

    /// @notice Convertit un montant en Wei vers Ether
    /// @param montantWei Le montant en Wei
    /// @return Le montant équivalent en Ether
    function weiEnEther(uint montantWei) public pure returns (uint) {
        return montantWei / 1 ether;
    }
}
