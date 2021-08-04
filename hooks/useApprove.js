import useWallet from "./useWallet";
import { getContract, approve } from "../utils/erc20";

const useApprove = (lpAddress, vaultAddress) => {
  const { web3, account } = useWallet();
  const lpContract = getContract(web3, lpAddress);
  const handleApprove = async () => {
    try {
      const tx = await approve(lpContract, vaultAddress, account);
      return tx;
    } catch (e) {
      return false;
    }
  };

  return { onApprove: handleApprove };
};

export default useApprove;
