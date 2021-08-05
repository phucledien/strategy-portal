import { useCallback, useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import useWallet from "./useWallet";
import { getContract, getAllowance } from "../utils/erc20";

const useAllowance = (lpAddress, vaultAddress) => {
  const [allowance, setAllowance] = useState(new BigNumber(0));
  const { web3, account } = useWallet();

  const lpContract = getContract(web3, lpAddress);
  const fetchAllowance = useCallback(async () => {
    const newAllowance = await getAllowance(lpContract, account, vaultAddress);
    setAllowance(new BigNumber(newAllowance));
  }, [account, vaultAddress, lpContract, web3]);

  useEffect(() => {
    if (account && vaultAddress && lpContract) {
      fetchAllowance();
    }
    let refreshInterval = setInterval(fetchAllowance, 10000);
    return () => clearInterval(refreshInterval);
  }, [account, web3]);

  return allowance;
};

export default useAllowance;
