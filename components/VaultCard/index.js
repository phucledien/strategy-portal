import { useState, useCallback, useEffect } from "react";
import BigNumber from "bignumber.js";
import { useWallet } from "use-wallet";
import Web3 from "web3";

import useAllowance from "/hooks/useAllowance";
import useApprove from "/hooks/useApprove";
import useBalance from "/hooks/useBalance";
import { getDisplayBalance, getFullDisplayBalance } from "/utils/formatBalance";
import VaultABI from "/constants/abi/Vault.json";

export default function VaultCard({ vault }) {
  const [requestedApproval, setRequestedApproval] = useState(false);
  const [requestedDeposit, setRequestedDeposit] = useState(false);
  const [requestedWithdraw, setRequestedWithdraw] = useState(false);
  const [lpBalance, setLpBalance] = useState("0");
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

      setLpBalance(getDisplayBalance(balance));
    } catch (e) {
      console.log(e);
    }
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
      setRequestedDeposit(true);

      await contract.methods.withdraw(withdrawAmmount).send({ from: account });

      setRequestedDeposit(false);
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
          <p>
            Your LP Tokens = <span class="font-semibold">{lpBalance} LP</span>
          </p>
        </div>

        <div class="mt-2">
          <p>
            LP Tokens in USD = <span class="font-semibold">Comming soon!</span>
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
                <span class="label-text">Deposit +</span>
              </label>
              <label class="cursor-pointer label space-x-2">
                <input
                  type="checkbox"
                  checked={!isDeposit}
                  onChange={switchToWithdraw}
                  class="checkbox"
                />
                <p>Withdraw -</p>
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
                    setAmmount(e.value);
                  }}
                  class="input input-bordered flex-1"
                />
                <button onClick={onMaxClick} class="btn flex-0.5">
                  MAX
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
