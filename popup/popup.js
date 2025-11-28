const handleToggle = (id) => {
    const toggle = document.getElementById(id)
    const key = toggle.name + "_enabled"
    getState(key, toggle)
    toggle.addEventListener('change', () => changeHandler(key, toggle))
}

const getState = (key, toggle) => {
    chrome.storage.sync.get(key, ({ enabled }) => {
        if (enabled == undefined) {
            enabled = true
            chrome.storage.sync.set({ [key]: enabled })
        }
        toggle.checked = !!enabled
    })
}

const changeHandler = (key, toggle) => {
    const enabled = toggle.checked;
    chrome.storage.sync.set({ [key]: enabled })
}

const ids = ['gifs-toggle', 'replies-toggle', 'repost-toggle']

ids.forEach((id) => handleToggle(id))