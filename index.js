const TronWeb = require('tronweb')
require('dotenv').config();

const contractAddresses = {
    nile: {
        USDT: "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj",
        USDC: "TEMVynQpntMqkPxP6wXTW2K7e4sM3cRmWz"
    },
    shasta: {
        USDT: "TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs",
        USDC: "TSdZwNqpHofzP6BsBKGQUWdBeJphLmF6id"
    },
    main: {
        USDT: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
        USDC: "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8"
    }
}

async function main(network, recipientAddress, amount) {
   try {
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

    
   } catch (error) {
    console.error(error);
   } 
}

main("nile");