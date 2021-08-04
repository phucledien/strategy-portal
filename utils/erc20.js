import { ethers } from "ethers";
import ERC20ABI from "../constants/abi/ERC20.json";

export const getContract = (web3, address) => {
  const contract =
    web3 && web3.eth && new web3.eth.Contract(ERC20ABI.abi, address);
  return contract;
};

export const getAllowance = async (contract, owner, spender) => {
  try {
    const allowance = await contract.methods.allowance(owner, spender).call();
    return allowance;
  } catch (e) {
    return "0";
  }
};

export const getBalance = async (web3, tokenAddress, userAddress) => {
  const lpContract = getContract(web3, tokenAddress);
  try {
    const balance = await lpContract.methods.balanceOf(userAddress).call();
    return balance;
  } catch (e) {
    return "0";
  }
};

export const approve = async (contract, spender, account) => {
  return contract.methods
    .approve(spender, ethers.constants.MaxUint256)
    .send({ from: account });
};
