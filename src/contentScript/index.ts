const Validator = require("wallet-validator");

/*global chrome*/
// If your extension doesn't need a content script, just leave this file empty
// import Web3 from "web3";
// if (typeof window.web3 === 'undefined') {
//   window.web3 = new Web3(Web3.givenProvider);
// }
// console.log(window.web3)
// This is an example of a script that will run on every page. This can alter pages
// Don't forget to change `matches` in manifest.json if you want to only change specific webpages
printAllPageLinks();

// This needs to be an export due to typescript implementation limitation of needing '--isolatedModules' tsconfig
export function printAllPageLinks() {
  // console.log("content", chrome.runtime)
  var ethScriptEl = document.createElement("script");
  ethScriptEl.innerHTML = `
    function connectSirkiWallet () {
      window.ethereum.enable().then((accounts) => {
        console.log(accounts)
        chrome.runtime.sendMessage(accounts[0])
      });
    }
    var buttonEl = document.createElement("button");
    buttonEl.onclick = connectSirkiWallet();
    buttonEl.innerHtml = "Connect Sirki"
    document.body.appendChild(buttonEl);
  `;
  document.body.appendChild(ethScriptEl);
}

export function connectMetaMask() {
  console.log("connectMetaMask");
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // window.ethereum
  let contentHtml = document.body.outerHTML;
  let strippedHtml = contentHtml.replace(/<[^>]+>/g, " ");
  const htmlArray = strippedHtml.split(" ");
  let addressArray = [];
  for (let i = 0; i < htmlArray.length; i++) {
    if (Validator.validate(htmlArray[i], "ETH")) {
      addressArray.push(htmlArray[i]);
    }
  }
  sendResponse(addressArray);
});
  // chrome.runtime.onMessage.addListener((request, sender, sendResponse1) => {
  //   console.log("Success receive")
  //   sendResponse1("Great")
  // })
  
//   const createMetaMaskProvider = require('metamask-extension-provider')

//   const provider = createMetaMaskProvider()

//   provider.on('error', (error) => {
//     // Failed to connect to MetaMask, fallback logic.
//   })
//   //@ts-ignore
//   window.web3.currentProvider.request({ method: 'eth_requestAccounts' }).then((accounts) => {
//     console.log(accounts)
//     sendResponse(accounts)
//   });
//   // console.log(document.body)
// })
