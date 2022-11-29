// If your extension doesn't need a background script, just leave this file empty

messageInBackground();

// This needs to be an export due to typescript implementation limitation of needing '--isolatedModules' tsconfig
export function messageInBackground() {

}

// chrome.runtime.onMessage.addListener(request => {
// 	if (request === "OpenPopup") {
// 		chrome.windows.create({
// 			url: "popup.html",
// 			type: "popup",
// 			focused: true,
// 			width: 400,
// 			height: 600,
// 			top: 0,
// 			left: 1600 - 400,
// 		}, () => {
// 			console.log("Opened popup!")
// 		})
// 	}
// })