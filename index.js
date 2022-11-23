const ethers = require("ethers");
const abi = require('./abi.json');
require("dotenv").config();

const url = "wss://mainnet.infura.io/ws/v3/" + process.env.INFURA_API_KEY;

async function init() {
  const customWsProvider = new ethers.providers.WebSocketProvider(url);

  // // Filter all pending transactions
  // customWsProvider.on("pending", (tx) => {
  //   customWsProvider.getTransaction(tx).then(function (transaction) {
  //     console.log(transaction);
  //   });
  // });

  const UniswapV3PoolAddress = '0x9e0905249CeEFfFB9605E034b534544684A58BE6';
  const contract = new
    ethers.Contract(UniswapV3PoolAddress, abi, customWsProvider)

  contract.on("Swap", (sender, recipient, amount0, amount1, sqrtPriceX96, liquidity, tick) => {
    console.log(`Swap event:Sender: ${sender}
    recipient: ${recipient}
    amount0: ${amount0}
    amount1: ${amount1}
    sqrtPriceX96: ${sqrtPriceX96}
    liquidity: ${liquidity}
    tick: ${tick}`);
  });
};

init();

