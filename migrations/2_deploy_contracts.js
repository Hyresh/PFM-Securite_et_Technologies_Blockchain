const Somme = artifacts.require("Somme");
const Conversion = artifacts.require("Conversion");
const GestionChaines = artifacts.require("GestionChaines");
const Signe = artifacts.require("Signe");
const Parite = artifacts.require("Parite");
const Tableaux = artifacts.require("Tableaux");
const Rectangle = artifacts.require("Rectangle");
const Payment = artifacts.require("Payment");

module.exports = async function (deployer, network, accounts) {
  // Ex 1 : Somme - avec deux valeurs initiales (10 et 20)
  await deployer.deploy(Somme, 10, 20);

  // Ex 2 : Conversion
  await deployer.deploy(Conversion);

  // Ex 3 : GestionChaines
  await deployer.deploy(GestionChaines);

  // Ex 4 : Signe
  await deployer.deploy(Signe);

  // Ex 5 : Parite
  await deployer.deploy(Parite);

  // Ex 6 : Tableaux
  await deployer.deploy(Tableaux);

  // Ex 7 : Rectangle (hérite de Forme)
  await deployer.deploy(Rectangle, 0, 0, 10, 5);

  // Ex 8 : Payment
  await deployer.deploy(Payment, accounts[0]);
};
