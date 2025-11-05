chrome.storage.sync.get('gifs_enabled', ({ gifs_enabled }) => {
    if (gifs_enabled !== false) {
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('gifs/injected.js');
        (document.head || document.documentElement).appendChild(script);
        script.onload = () => script.remove();
        console.debug('GIF filter injected');
    } else {
        console.debug('GIF filter disabled - not injecting');
    }
});

// Listen for changes and reload page
chrome.storage.onChanged.addListener((changes) => {
    if ('gifs_enabled' in changes) {
        console.debug('Settings changed - reloading page');
        location.reload();
    }
});