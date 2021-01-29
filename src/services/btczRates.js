const request = require('request-promise-native');

const btczRates = {
  getAll() {
    return Promise.all([
      request({ uri: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoinz&vs_currencies=btc', json: true }),
      request({ uri: 'https://bitpay.com/api/rates', json: true }),
    ]).then((results) => {
      //const cmcData = results[0]; // results from coinmarketcap
      const bitpayData = results[1]; // results from bitpay
      const btczBtcExchangeRate = results[0].bitcoinz.btc;
      const rates = [];

      bitpayData.forEach((value) => {
        const exchangeRate = btczBtcExchangeRate * value.rate;
        rates.push({ code: value.code, name: value.name, rate: exchangeRate });
      });

      return rates;
    });
  },
};

module.exports = btczRates;
