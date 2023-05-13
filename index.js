const TronWeb = require('tronweb')
require('dotenv').config();


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