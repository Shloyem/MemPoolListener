const ethers = require("ethers");
const routerAbi = require('./abi/UniswapV3Router.json');
const poolAbi = require('./abi/UniswapV3Pool.json');
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

  const UniswapV3Router = '0xE592427A0AEce92De3Edee1F18E0157C05861564';
  const UniswapV3Pool = '0x9e0905249CeEFfFB9605E034b534544684A58BE6';
  const routerInterface = new ethers.utils.Interface(routerAbi);

  // Filter pending transactions only for a specific address

  customWsProvider.on("pending", async (tx) => {
    const txData = await customWsProvider.getTransaction(tx);
    let decoded;
    if (txData && txData.to == UniswapV3Router && txData.data.includes("0x414bf389")) {
      console.log("hash: ", txData['hash']);
      decoded = routerInterface.decodeFunctionData("exactInputSingle((address,address,uint24,address,uint256,uint256,uint256,uint160))", txData['data']);
      console.log("tokenIn: ", decoded['params']['tokenIn']);
      console.log("tokenOut: ", decoded['params']['tokenOut']);
      console.log("amount: ", decoded['params']['amountOutMinimum'].toString());
      console.log("-------------");
    }
  });


  // 1st way to listen to a specific contract event

  // const contract = new
  //   ethers.Contract(UniswapV3Pool, poolAbi, customWsProvider)

  // contract.on("Swap", (sender, recipient, amount0, amount1, sqrtPriceX96, liquidity, tick) => {
  //   console.log(`Swap event:Sender: ${sender}
  //   recipient: ${recipient}
  //   amount0: ${amount0}
  //   amount1: ${amount1}
  //   sqrtPriceX96: ${sqrtPriceX96}
  //   liquidity: ${liquidity}
  //   tick: ${tick}`);
  // });

  // 2nd way to listen to a specific contract event

  // const filter = {
  //   address: UniswapV3Pool,
  //   topics: [
  //     ethers.utils.id("Swap(address,address,int256,int256,uint160,uint128,int24)")
  //   ]
  // }

  // const poolInterface = new ethers.utils.Interface(poolAbi);
  // let parsedLog;

  // customWsProvider.on(filter, (log) => {
  //   // console.log(`Log before parsing:`, log);
  //   parsedLog = poolInterface.parseLog(log);
  //   // console.log(`Log after parsing with args:`, parsedLog);

  //   console.log(`Event of type: ${parsedLog.name}
  //   Sender: ${parsedLog.args.sender}
  //   recipient: ${parsedLog.args.recipient}
  //   amount0: ${parsedLog.args.amount0}
  //   amount1: ${parsedLog.args.amount1}
  //   sqrtPriceX96: ${parsedLog.args.sqrtPriceX96}
  //   liquidity: ${parsedLog.args.liquidity}
  //   tick: ${parsedLog.args.tick}`);
  // })
};

init();

