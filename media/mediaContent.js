(async () => {
    const filtersToInject = []

    // Get values properly using Promises
    const { gifsEnabled } = await chrome.storage.sync.get('gifsEnabled');
    if (gifsEnabled !== false) {
        filtersToInject.push('media/gifsFilter.js');
    }

    const { repliesEnabled } = await chrome.storage.sync.get('repliesEnabled');
    if (repliesEnabled !== false) {
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

        console.log('Media filters injected');
    } else {
        console.log('Media filters disabled - not injecting');
    }

    // Listen for changes and reload page
    chrome.storage.onChanged.addListener((changes) => {
        if (['gifsEnabled', 'repliesEnabled'].some(key => key in changes)) {
            console.debug('Settings changed - reloading page');
            location.reload();
        }
    });
})();
