
{ pkgs ? import ./nixpkgs.nix {} }:

with pkgs;

mkShell {
  buildInputs = [
    yarn
    netlify-cli
    nodejs
    nodePackages.js-beautify
  ];
}

