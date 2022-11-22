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
  // console.log(sending)
  // sending.then(() => console.log("Success"), () => console.log("Failed"))
  console.log("+++");
}

console.log("here")
console.log(document.body)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // window.ethereum
  console.log(document.body)
  sendResponse(["0x1234", "0x1235"])
})
