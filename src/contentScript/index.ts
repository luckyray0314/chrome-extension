const Validator = require("wallet-validator");

/*global chrome*/
// If your extension doesn't need a content script, just leave this file empty

// This is an example of a script that will run on every page. This can alter pages
// Don't forget to change `matches` in manifest.json if you want to only change specific webpages
printAllPageLinks();

// This needs to be an export due to typescript implementation limitation of needing '--isolatedModules' tsconfig
export function printAllPageLinks() {
  // console.log("content", chrome.runtime)
}

export function connectMetaMask() {
  console.log("connectMetaMask");
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // window.ethereum
  let contentHtml = document.body.outerHTML;
  // let contentHtml = document.getElementsByTagName("html")[0].innerHTML;
  // console.log(contentHtml);
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
