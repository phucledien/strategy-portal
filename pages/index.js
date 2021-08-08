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
    {
      name: "FTM-BOO Spooky Pod",
      address: "0x0f71013b113cF05D8aE5e5A551e28464deCE3097",
      lpAddress: "0xec7178f4c41f346b2721907f5cf7628e388a7a58",
    },
    {
      name: "FTM-ICE Spooky Pod",
      address: "0xA657D27b1695dfb62DB526FB07f1c57D47721c43",
      lpAddress: "0x623ee4a7f290d11c11315994db70fb148b13021d",
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
