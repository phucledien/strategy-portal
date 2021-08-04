import { useState, useCallback, useEffect } from "react";
import BigNumber from "bignumber.js";

import useWallet from "./useWallet";
import { getBalance } from "/utils/erc20";

const useBalance = (tokenAddress) => {
  const [balance, setBalance] = useState(BigNumber("0"));
  const { web3, account } = useWallet();

  const fetchBalance = useCallback(async () => {
    const balance = await getBalance(web3, tokenAddress, account);
    setBalance(BigNumber(balance));
  }, [account, tokenAddress, web3]);

  useEffect(() => {
    if (account && tokenAddress) {
      fetchBalance();
    }
  }, [account, tokenAddress, fetchBalance]);

  return balance;
};

export default useBalance;
