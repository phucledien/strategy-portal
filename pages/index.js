import Link from "next/link";
import { UseWalletProvider } from "use-wallet";
import MetaMaskButton from "/components/MetamaskButton";
import VaultCard from "/components/VaultCard";

export default function Home() {
  let vaults = [
    {
      name: "FTM-TSHARE Tomb Pod",
      address: "0x06e1866a83be1778dbc5c9c89adb20bfe27cbb18",
      lpAddress: "0x4733bc45ef91cf7ccecaeedb794727075fb209f2",
    },
    {
      name: "FTM-TOMB Tomb Pod",
      address: "0x274c7eC8238dC554c4300807ca49f140a16B42c6",
      lpAddress: "0x2A651563C9d3Af67aE0388a5c8F89b867038089e",
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
            {vaults.map((vault) => (
              <VaultCard key={vault.name} vault={vault} />
            ))}
          </div>
        </div>
      </div>
    </UseWalletProvider>
  );
}
