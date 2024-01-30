let
  version = "23.11";
  sha256 = "sha256:1ndiv385w1qyb3b18vw13991fzb9wg4cl21wglk89grsfsnra41k";
  nixpkgs = fetchTarball {
    inherit sha256;
    url = "https://github.com/NixOS/nixpkgs/archive/refs/tags/${version}.tar.gz";
  };
in
import nixpkgs
