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

// This needs to be an export due to typescript implementation limitation of needing '--isolatedModules' tsconfig

// const jqueryScript = document.createElement("script");
// jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
// jqueryScript.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(jqueryScript);

// const addButtonScript = document.createElement("script");
// addButtonScript.innerHTML = `
// function addButton() {
//   const allSpan = $('span').map(function() {
//     const text = $(this).text();
//     console.log(text);
//     $(this).html(text + "<button>SEND</button>")
//     return this.innerHTML;
//   }).get();
// }
// addButton();
// `
// document.body.appendChild(addButtonScript);

export function printAllPageLinks() {
}

const connect = async () => {
  const ethScriptEl = document.createElement("script");
  ethScriptEl.innerHTML = `
  function connectSirkiWallet () {
    if (window.ethereum) {
      window.ethereum.enable().then((accounts) => {
        const spanAddress = document.createElement("span");
        spanAddress.setAttribute("id", "span-wallet-address");
        spanAddress.setAttribute("hidden", true);
        const textnode = document.createTextNode(accounts[0]);
        spanAddress.appendChild(textnode);
        document.body.appendChild(spanAddress);
      });
    } else {
      alert("Can't find the wallet");
    }
  }
  connectSirkiWallet();
  `;
  document.body.appendChild(ethScriptEl);
};

const signIn = async () => {
  const signScriptEl = document.createElement("script");
  signScriptEl.innerHTML = `
  async function signInWallet () {
    const msgParams = [
      {
        type: 'string',
        name: 'Message',
        value: 'superbluestar',
      },
    ];
    let myWallet;
    if (document.getElementById("span-wallet-address")) {
      myWallet = document.getElementById("span-wallet-address").innerHTML;
    }
    try {
      const from = myWallet;
      const sign = await ethereum.request({
        method: 'eth_signTypedData',
        params: [msgParams, from],
      });
      const spanHash = document.createElement("span");
      spanHash.setAttribute("id", "span-hash");
      spanHash.setAttribute("hidden", true);
      const textnode = document.createTextNode(sign);
      spanHash.appendChild(textnode);
      document.body.appendChild(spanHash);
    } catch (err) {
      console.error(err);
    }
  }
  signInWallet();
  `;
  document.body.appendChild(signScriptEl);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.url === "detect") {
    let contentHtml = document.body.outerHTML;
    let strippedHtml = contentHtml.replace(/<[^>]+>/g, " ");
    const htmlArray = strippedHtml.split(" ");
    const myWallet = document.getElementById("span-wallet-address").innerHTML;
    let addressArray = [];
    for (let i = 0; i < htmlArray.length; i++) {
      if (
        Validator.validate(htmlArray[i], "ETH") &&
        htmlArray[i] !== myWallet
      ) {
        addressArray.push(htmlArray[i]);
      }
    }
    sendResponse(addressArray);
  } else if (request.url === "connect") {
    connect();
  } else if (request.url === "get-my-wallet") {
    let myWallet = [];
    const spanEl = document.getElementById("span-wallet-address");
    if (spanEl) {
      myWallet.push(spanEl.innerHTML);
      sendResponse(myWallet);
    }
  } else if (request.url === "sign-in-metamask") {
    signIn();
  } else if (request.url === "get-hash") {
    const spanEl = document.getElementById("span-hash");
    if (spanEl) {
      const hash = spanEl.innerHTML;
      console.log("hash:" + hash);
      sendResponse(hash);
    }
  }
});
