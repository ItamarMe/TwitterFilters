(async () => {
    const filtersToInject = []

    // Get values properly using Promises
    const { gifs_enabled } = await chrome.storage.sync.get('gifs_enabled');
    if (gifs_enabled !== false) {
        filtersToInject.push('media/gifsFilter.js');
    }

    const { replies_enabled } = await chrome.storage.sync.get('replies_enabled');
    if (replies_enabled !== false) {
        filtersToInject.push('media/repliesFilter.js');
    }

    if (filtersToInject) {
        const injectScript = (url) => {
            const script = document.createElement('script');
            script.src = chrome.runtime.getURL(url);
            (document.head || document.documentElement).appendChild(script);
            script.onload = () => script.remove();
        }

        injectScript('media/cleanFilters.js')

        filtersToInject.forEach((url) => { injectScript(url) })

        injectScript('media/injected.js')

        console.debug('GIF filter injected');
    } else {
        console.debug('GIF filter disabled - not injecting');
    }

    // Listen for changes and reload page
    chrome.storage.onChanged.addListener((changes) => {
        if ('gifs_enabled' in changes || 'replies_enabled' in changes) {
            console.debug('Settings changed - reloading page');
            location.reload();
        }
    });
})();
