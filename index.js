const TronWeb = require("tronweb");
require("dotenv").config();

const contractAddresses = {
  nile: {
    USDT: "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj",
    USDC: "TEMVynQpntMqkPxP6wXTW2K7e4sM3cRmWz",
  },
  shasta: {
    USDT: "TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs",
    USDC: "TSdZwNqpHofzP6BsBKGQUWdBeJphLmF6id",
  },
  main: {
    USDT: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
    USDC: "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8",
  },
};

async function main(network, stableCoin, toAddress, amount) {
  try {
    const fromAddress = process.env.FROM_ADDRESS;
    let url = null;
    if (network === "shasta") {
      url = process.env.SHASTA_URL;
    } else if (network === "nile") {
      url = process.env.NILE_URL;
    } else {
      url = process.env.MAIN_URL;
    }

    const tronWeb = new TronWeb({
      fullHost: url,
      privateKey: process.env.PRIVATE_KEY,
    });

    const contractAddress = contractAddresses[network][stableCoin];
    console.log(contractAddress);

    const options = {
      feeLimit: 100000000,
      callValue: 0,
    };
    const tx = await tronWeb.transactionBuilder.triggerSmartContract(
      contractAddress,
      "transfer(address,uint256)",
      options,
      [
        // {
        //   type: "address",
        //   value: fromAddress,
        // },
        {
          type: "address",
          value: toAddress,
        },
        {
          type: "uint256",
          value: amount * 1000000,
        },
      ],
      tronWeb.address.toHex(fromAddress)
    );
    const signedTx = await tronWeb.trx.sign(tx.transaction);
    const broadcastTx = await tronWeb.trx.sendRawTransaction(signedTx);
    console.log(broadcastTx);
  } catch (error) {
    console.error(error);
  }
}

main("nile", "USDT", "TM5eRnvnFwybMfQMdGBFMfNnC2nX7pxA7Y", 11);
