var ethers = require("ethers");
require("dotenv").config();

var url = "wss://mainnet.infura.io/ws/v3/" + process.env.INFURA_API_KEY;

var init = function () {
  var customWsProvider = new ethers.providers.WebSocketProvider(url);
  customWsProvider.on("pending", (tx) => {
    customWsProvider.getTransaction(tx).then(function (transaction) {
      console.log(transaction);
    });
  });
};
init();

