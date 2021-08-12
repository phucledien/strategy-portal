import BigNumber from "bignumber.js";
import IUniswapV2Router from "/constants/abi/IUniswapV2Router.json";

export const getTokenPrice = async (web3, address) => {
  const spookyRouterAddress = "0xf491e7b69e4244ad4002bc14e878a34207e38c29";
  const contract =
    web3 &&
    web3.eth &&
    new web3.eth.Contract(IUniswapV2Router.abi, spookyRouterAddress);

  const wftmAddress = "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83";
  const usdcAddress = "0x04068da6c83afcfa0e13ba15a6696662335d5b75";
  const route =  address !== wftmAddress ? [address, wftmAddress, usdcAddress] : [wftmAddress, usdcAddress];

  const token = await contract.methods
    .getAmountsOut("1000000000000000000", [address, wftmAddress, usdcAddress])
    .call();

  const tokenPrice = new BigNumber(token[2]).div(new BigNumber(10).pow(6));

  return tokenPrice;
};
