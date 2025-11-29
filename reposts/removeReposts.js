const repostSVG = '"M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"'

const deleteReposts = () => {
    const timeline = document.querySelector('[aria-label^="Timeline:"]');
    if (!timeline) return;
    timeline.querySelectorAll(`path[d=${repostSVG}]`)
        .forEach(el => {
            el.closest('[data-testid="cellInnerDiv"]').classList.add('hide-repost');
        });
}

const showReposts = () => {
    const timeline = document.querySelector('[aria-label^="Timeline:"]');
    if (!timeline) return;
    timeline.querySelectorAll(`.hide-repost`)
        .forEach(el => {
            el.classList.remove('hide-repost')
        });
}

const observer = new MutationObserver(() => {
    deleteReposts()
});

const main = (enabled) => {
    if (enabled !== false) {
        deleteReposts()
        observer.observe(document, { childList: true, subtree: true });

        console.log('Removing reposts');
    } else {
        observer.disconnect()
        showReposts()
        console.log('Returning reposts');
    }
}

chrome.storage.sync.get('reposts_enabled', (result) => {
    main(result['reposts_enabled'])
});

// Listen for changes and reload page
chrome.storage.onChanged.addListener((changes) => {
    if ('reposts_enabled' in changes) {
        main(changes.reposts_enabled.newValue)
    }
});