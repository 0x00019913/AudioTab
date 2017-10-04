// runs when the browser action is clicked or activated via hotkey
chrome.browserAction.onClicked.addListener(function() {
  switchToAudioTab();
});

// switch to the first tab that's playing audio
function switchToAudioTab() {
  chrome.tabs.query({ "audible": true }, function (result) {
    if (result.length>0) chrome.tabs.update(result[0].id, {active: true });
  });
}

// create the "Assign Hotkey" button in the browser action's context menu
chrome.contextMenus.removeAll();
chrome.contextMenus.create({
  title: "Assign Hotkey",
  id: "assign_hotkey",
  contexts: ["browser_action"]
});

// clicking the "Assign Hotkey" button opens the extension hotkey window
chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId=="assign_hotkey") {
    chrome.tabs.create({
      url: "chrome://extensions/configureCommands"
    });
  }
});