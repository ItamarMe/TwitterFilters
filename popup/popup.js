const repostToggle = document.getElementById('repost-toggle');

// Load saved state
chrome.storage.sync.get('reposts_enabled', ({ reposts_enabled }) => {
    if (reposts_enabled == undefined) {
        reposts_enabled = true
        chrome.storage.sync.set({ reposts_enabled });
    }
    repostToggle.checked = !!reposts_enabled;
});

// Handle user toggle
repostToggle.addEventListener('change', () => {
    const reposts_enabled = repostToggle.checked;
    chrome.storage.sync.set({ reposts_enabled });
});

const gifsToggle = document.getElementById('gifs-toggle');

// Load saved state
chrome.storage.sync.get('gifs_enabled', ({ gifs_enabled }) => {
    if (gifs_enabled == undefined) {
        gifs_enabled = true
        chrome.storage.sync.set({ gifs_enabled });
    }
    gifsToggle.checked = !!gifs_enabled;
});

// Handle user toggle
gifsToggle.addEventListener('change', async () => {
    const gifs_enabled = gifsToggle.checked;
    chrome.storage.sync.set({ gifs_enabled });
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (tab && tab.id && tab.url.startsWith("https://x.com/")) {
        chrome.tabs.reload(tab.id);
    }
});