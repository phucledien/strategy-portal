import Link from "next/link";
import { UseWalletProvider } from "use-wallet";
import MetaMaskButton from "/components/MetamaskButton";
import VaultCard from "/components/VaultCard";
import MasonryVaultCard from "/components/MasonryVaultCard";

export default function Home() {
  let vaults = [
    {
      name: "BASED-TOMB Based Pod",
      address: "0xe01c0db7c947328773ace0544d1db91b11df49a5",
      lpAddress: "0xab2ddcbb346327bbdf97120b0dd5ee172a9c8f9e",
      tokenA: "0x8d7d3409881b51466b483b11ea1b8a03cded89ae",
      tokenB: "0x6c021Ae822BEa943b2E66552bDe1D2696a53fbB7",
      type: "lpStake",
    },
    {
      name: "FTM-TOMB Tomb Pod",
      address: "0xe8b02e2ea7470578e6449e56db2c5ffba2d3832e",
      lpAddress: "0x2A651563C9d3Af67aE0388a5c8F89b867038089e",
      tokenA: "0x6c021ae822bea943b2e66552bde1d2696a53fbb7",
      tokenB: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
      type: "lpStake",
    },
    {
      name: "USDC-DAI Spirit Pod",
      address: "0x23BCC475C2f0D240Bf1abbd8F7DeA4321EbA3BC0",
      lpAddress: "0x9606d683d03f012dda296ef0ae9261207c4a5847",
      tokenA: "0x04068da6c83afcfa0e13ba15a6696662335d5b75",
      tokenB: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e",
      type: "lpStake",
    },
    {
      name: "PFTM-FTM Ripae Pod",
      address: "0xAe403C046887bcB9bCc7425b96Cb3C7543C5455a",
      lpAddress: "0x9ce8e9b090e8af873e793e0b78c484076f8ceece",
      tokenA: "0x112df7e3b4b7ab424f07319d4e92f41e6608c48b",
      tokenB: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
      type: "lpStake",
    },
    {
      name: "Tshare Masonry Pod",
      address: "0x4774417c2220bff0fe2caa3fb859dcf4b07d1181",
      tokenName: "Tshare",
      tokenAddress: "0x4cdf39285d7ca8eb3f090fda0c069ba5f4145b37",
      type: "masonry",
    },
    {
      name: "2share Masonry Pod",
      address: "0x4bf135993b7E558112743bF30d2eF54C19c43055",
      tokenName: "2share",
      tokenAddress: "0xc54a1684fd1bef1f077a336e6be4bd9a3096a6ca",
      type: "masonry",
    },
    {
      name: "3share Masonry Pod",
      address: "0x7074D8f6B7FD6b5D253466D1f36dcf606C28942D",
      tokenName: "3share",
      tokenAddress: "0x6437adac543583c4b31bf0323a0870430f5cc2e7",
      type: "masonry",
    },
  ];

  return (
    <UseWalletProvider chainId={250}>
      <div class="container mx-auto px-2">
        <div class="flex mt-5 justify-between">
          <Link href="/">
            <a class="text-lg font-bold">Strategy Portal</a>
          </Link>
          <MetaMaskButton />
        </div>
        <div class="container mt-16 px-8">
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vaults.map((vault) => {
              if (vault.type == "masonry") {
                return <MasonryVaultCard key={vault.name} vault={vault} />;
              } else {
                return <VaultCard key={vault.name} vault={vault} />;
              }
            })}
          </div>
        </div>
      </div>
    </UseWalletProvider>
  );
}
