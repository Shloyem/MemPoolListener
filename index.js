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

  // 1st way to filter mempool listener

  // const contract = new
  //   ethers.Contract(UniswapV3PoolAddress, abi, customWsProvider)

  // contract.on("Swap", (sender, recipient, amount0, amount1, sqrtPriceX96, liquidity, tick) => {
  //   console.log(`Swap event:Sender: ${sender}
  //   recipient: ${recipient}
  //   amount0: ${amount0}
  //   amount1: ${amount1}
  //   sqrtPriceX96: ${sqrtPriceX96}
  //   liquidity: ${liquidity}
  //   tick: ${tick}`);
  // });

  // 2nd way to filter mempool listener

  const filter = {
    address: UniswapV3PoolAddress,
    topics: [
      ethers.utils.id("Swap(address,address,int256,int256,uint160,uint128,int24)")
    ]
  }

  const interface = new ethers.utils.Interface(abi);
  let parsedLog;

  customWsProvider.on(filter, (log) => {
    // console.log(`Log before parsing:`, log);
    parsedLog = interface.parseLog(log);
    // console.log(`Log after parsing with args:`, parsedLog);

    console.log(`Event of type: ${parsedLog.name}
    Sender: ${parsedLog.args.sender}
    recipient: ${parsedLog.args.recipient}
    amount0: ${parsedLog.args.amount0}
    amount1: ${parsedLog.args.amount1}
    sqrtPriceX96: ${parsedLog.args.sqrtPriceX96}
    liquidity: ${parsedLog.args.liquidity}
    tick: ${parsedLog.args.tick}`);
  })
};

init();

