(async () => {
    const injectScript = (url) => {
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL(url);
        (document.head || document.documentElement).appendChild(script);
        script.onload = () => script.remove();
    }

    injectScript('media/cleanFilters.js')

    const filtersToInject = []

    const addFilter = async (filter) => {
        const key = filter + 'Enabled'
        const result = await chrome.storage.sync.get(key);

        const enabled = result[key]
        if (enabled !== false) {
            const prefix = 'media/'
            const suffix = 'Filter.js'
            filtersToInject.push(prefix + filter + suffix)
        }
    }

    const filters = ['gifs', 'replies']

    for (const filter of filters) {
        await addFilter(filter);
    }

    if (filtersToInject.length != 0) {

        filtersToInject.forEach((url) => { injectScript(url) })

        injectScript('media/injected.js')

        console.log('Media filters injected');
    } else {
        console.log('Media filters disabled - not injecting');
    }

    // Listen for changes and reload page
    chrome.storage.onChanged.addListener((changes) => {
        if (filters.some(key => (key + 'Enabled') in changes)) {
            console.debug('Settings changed - reloading page');
            location.reload();
        }
    });
})();
