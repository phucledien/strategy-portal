import { useState, useCallback, useEffect } from "react";
import BigNumber from "bignumber.js";
import { useWallet } from "use-wallet";
import Web3 from "web3";

import useAllowance from "/hooks/useAllowance";
import useApprove from "/hooks/useApprove";
import useBalance from "/hooks/useBalance";
import { getDisplayBalance, getFullDisplayBalance } from "/utils/formatBalance";
import VaultABI from "/constants/abi/Vault.json";
import { getBalance, getTotalSupply } from "/utils/erc20";
import { getTokenPrice } from "../../utils/uniswapV2";

export default function VaultCard({ vault }) {
  const [requestedApproval, setRequestedApproval] = useState(false);
  const [requestedDeposit, setRequestedDeposit] = useState(false);
  const [requestedWithdraw, setRequestedWithdraw] = useState(false);
  const [lpBalance, setLpBalance] = useState(BigNumber("0"));
  const displayLpBalance = getDisplayBalance(lpBalance);
  const [displayLpPrice, setDisplayLPPrice] = useState("0");
  const [isDeposit, setIsDeposit] = useState(true);
  const [ammount, setAmmount] = useState("0");

  const { ethereum, account } = useWallet();

  const { onApprove } = useApprove(vault.lpAddress, vault.address);
  const allowance = useAllowance(vault.lpAddress, vault.address);

  const inWalletBalance = useBalance(vault.lpAddress);
  const displayInWalletBalance = getDisplayBalance(inWalletBalance);

  const shareBalance = useBalance(vault.address);
  const displayShareBalance = getDisplayBalance(shareBalance);

  useEffect(() => {
    fetchLPBalance();
  }, [shareBalance]);

  useEffect(() => {
    fetchLPPrice();
  }, [lpBalance]);

  const fetchLPBalance = async () => {
    const web3 = new Web3(ethereum);
    const contract = new web3.eth.Contract(VaultABI.abi, vault.address);
    try {
      let pricePerFullShare = await contract.methods
        .getPricePerFullShare()
        .call();

      let balance = new BigNumber(pricePerFullShare)
        .multipliedBy(shareBalance)
        .dividedBy(new BigNumber(10).pow(18));

      setLpBalance(balance);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchLPPrice = async () => {
    if (lpBalance.eq("0")) {
      return;
    }
    const web3 = new Web3(ethereum);
    const tokenAAmount = await getBalance(web3, vault.tokenA, vault.lpAddress); // web3, tokenAAddress, ownerAddress
    const totalSupply = await getTotalSupply(web3, vault.lpAddress); // web3, token address
    const portionLP = lpBalance.div(new BigNumber(totalSupply));
    const totalTokenAValue = portionLP
      .times(new BigNumber(tokenAAmount))
      .times(new BigNumber(2))
      .div(new BigNumber(10).pow(18));

    const tokenPrice = await getTokenPrice(web3, vault.tokenA);
    const totalTokenAPrice = tokenPrice.times(totalTokenAValue).toFixed(2);

    setDisplayLPPrice(totalTokenAPrice);
  };

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true);
      const txHash = await onApprove();
      if (!txHash) {
        setRequestedApproval(false);
      }
    } catch (e) {
      console.log(e);
    }
  }, [onApprove, setRequestedApproval]);

  const deposit = async () => {
    const web3 = new Web3(ethereum);
    let depositAmmount = web3.utils.toBN(web3.utils.toWei(ammount));
    const contract = new web3.eth.Contract(VaultABI.abi, vault.address);

    try {
      setRequestedDeposit(true);

      await contract.methods.deposit(depositAmmount).send({ from: account });

      setAmmount("0");
      setRequestedDeposit(false);
    } catch (e) {
      console.log(e);
    }
  };

  const withdraw = async () => {
    const web3 = new Web3(ethereum);
    let withdrawAmmount = web3.utils.toBN(web3.utils.toWei(ammount));
    const contract = new web3.eth.Contract(VaultABI.abi, vault.address);

    try {
      setRequestedWithdraw(true);

      await contract.methods.withdraw(withdrawAmmount).send({ from: account });

      setAmmount("0");
      setRequestedWithdraw(false);
    } catch (e) {
      console.log(e);
    }
  };

  const switchToDeposit = () => {
    setIsDeposit(true);
    setAmmount("0");
  };

  const switchToWithdraw = () => {
    setIsDeposit(false);
    setAmmount("0");
  };

  const onMaxClick = () => {
    if (isDeposit) {
      setAmmount(getFullDisplayBalance(inWalletBalance));
    } else {
      setAmmount(getFullDisplayBalance(shareBalance));
    }
  };

  return (
    <div class="card shadow">
      <div class="card-body">
        <h2 class="card-title">{vault.name}</h2>
        <div>
          <p class="truncate">
            Your LP Tokens ={" "}
            <span class="font-semibold truncate">{displayLpBalance} LP</span>
          </p>
        </div>

        <div class="mt-2">
          <p>
            LP Tokens in USD ={" "}
            <span class="font-semibold">${displayLpPrice}</span>
          </p>
        </div>

        {!allowance.toNumber() ? (
          <button
            class="btn btn-primary mt-4"
            disabled={requestedApproval}
            onClick={handleApprove}
          >
            Approve
          </button>
        ) : (
          <>
            <div class="mt-8 flex justify-center space-x-8">
              <label class="cursor-pointer label space-x-2">
                <input
                  type="checkbox"
                  checked={isDeposit}
                  onChange={switchToDeposit}
                  class="checkbox"
                />
                <span class="label-text">Deposit</span>
              </label>
              <label class="cursor-pointer label space-x-2">
                <input
                  type="checkbox"
                  checked={!isDeposit}
                  onChange={switchToWithdraw}
                  class="checkbox"
                />
                <span class="label-text">Withdraw</span>
              </label>
            </div>

            <div class="form-control mt-4">
              <div>
                {isDeposit ? (
                  <p class="text-xs">
                    In Wallet:
                    <span class="font-semibold">
                      {" "}
                      {displayInWalletBalance} LP
                    </span>
                  </p>
                ) : (
                  <p class="text-xs">
                    Shares:
                    <span class="font-semibold"> {displayShareBalance}</span>
                  </p>
                )}
              </div>
              <div class="flex space-x-2 mt-1">
                <input
                  type="text"
                  value={ammount}
                  onChange={(e) => {
                    setAmmount(e.target.value);
                  }}
                  class="input input-bordered flex-1"
                />
                <button onClick={onMaxClick} class="btn flex-0.5">
                  <p class="text-xs sm:text-md">MAX</p>
                </button>
              </div>
            </div>
            {isDeposit ? (
              <button class="btn btn-primary mt-4" onClick={deposit}>
                Deposit
              </button>
            ) : (
              <button class="btn btn-primary mt-4" onClick={withdraw}>
                Withdraw
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
