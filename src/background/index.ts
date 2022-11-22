// If your extension doesn't need a background script, just leave this file empty

messageInBackground();

// This needs to be an export due to typescript implementation limitation of needing '--isolatedModules' tsconfig
export function messageInBackground() {
  console.log('I can run your javascript like any other code in your project');
  console.log('just do not forget, I cannot render anything !');
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request)
  console.log(document)
})

// chrome.runtime.sendMessage({ url: "1234"});
