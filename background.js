chrome.runtime.onInstalled.addListener(() => {
    // Initialize the whitelist if it doesn't exist
    if (!localStorage.getItem('whitelist')) {
        localStorage.setItem('whitelist', JSON.stringify([]));
    }
    
    // Set the default icon
    chrome.browserAction.setIcon({ path: "icon.png" });
});
