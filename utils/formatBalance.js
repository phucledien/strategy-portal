import BigNumber from "bignumber.js";

/**
 * Returns the balance in number type
 * @param  {string} balance
 * @param  {string} decimals=18
 * @returns {number}
 */
export const getBalanceNumber = (balance, decimals = 18) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals));
  return displayBalance.toNumber();
};

/**
 * Returns the formatted balance
 * @param  {} balance
 * @param  {} decimals=18
 * @returns {string}
 */
export const getDisplayBalance = (balance, decimals = 18) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals));
  if (displayBalance.lt(1)) {
    return displayBalance.toPrecision(18);
  } else {
    return displayBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

/**
 * Returns the full balance in string
 * @param  {} balance
 * @param  {} decimals=18
 * @returns {string}
 */
export const getFullDisplayBalance = (balance, decimals = 18) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed();
};
