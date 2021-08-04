import Head from "next/head";
import Link from "next/link";
import { UseWalletProvider } from "use-wallet";
import MetaMaskButton from "/components/MetamaskButton";
import VaultCard from "/components/VaultCard";

export default function Home() {
  let vaults = [
    {
      name: "FTM-TSHARE Tomb Pod",
      lpAddress: "0x4733bc45ef91cf7ccecaeedb794727075fb209f2",
      address: "0x06e1866a83be1778dbc5c9c89adb20bfe27cbb18",
    },
  ];
  return (
    <UseWalletProvider
      chainId={250}
      connectors={{
        walletconnect: { rpcUrl: "https://rpcapi.fantom.network" },
      }}
    >
      <div class="container mx-auto px-2">
        <div class="flex mt-5 justify-between">
          <Link href="/">
            <a class="text-lg font-bold">Strategy Portal</a>
          </Link>
          <MetaMaskButton />
        </div>
        <div class="container mt-16 px-8">
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vaults.map((vault) => (
              <VaultCard key={vault.name} vault={vault} />
            ))}

            <div class="card shadow">
              <div class="card-body">
                <h2 class="card-title">FTM-TOMB Tomb Pod</h2>
                <p>Comming soon!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UseWalletProvider>
  );
}
