import Image from "next/image";
import { useWallet } from "use-wallet";
import formatAddress from "/utils/formatAddress";
import metamask from "/public/ico_metamask.png";

export default function MetaMaskButton() {
  const { account, connect } = useWallet();

  return !account ? (
    <button class="btn btn-primary" onClick={() => connect("injected")}>
      <div class="flex space-x-2">
        <div class="w-6 h-6">
          <Image src={metamask} />
        </div>
        <p>Connect to MetaMask</p>
      </div>
    </button>
  ) : (
    <div class="">
      <p>{formatAddress(account)}</p>
    </div>
  );
}
