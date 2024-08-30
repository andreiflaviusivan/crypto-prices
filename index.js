const axios = require('axios')

async function main() {
  // First we call this endpoint
  // https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR

  const respCryptoCompare = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR');

  const dataCryptoCompare = respCryptoCompare.data;

  console.log(`CryptoCompare: ETH price is ${dataCryptoCompare.EUR} EUR and ${dataCryptoCompare.USD} USD`);

  // First we call this endpoint
  // https://api.coinbase.com/v2/exchange-rates?currency=ETH

  const respCoinbase = await axios.get('https://api.coinbase.com/v2/exchange-rates?currency=ETH');

  const dataCoinbase = respCoinbase.data.data.rates;

  console.log(`Coinbase: ETH price is ${dataCoinbase.EUR} EUR and ${dataCoinbase.USD} USD`);
}

main();