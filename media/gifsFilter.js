(() => {
    const filterGifs = (items) => {
        const blockedTypes = ["animated_gif"];
        return items.filter((item) => {
            const type = item?.item?.itemContent?.tweet_results?.result?.legacy?.entities?.media[0]?.type
            return !blockedTypes.includes(type)
        })
    }

    if (window.filtersArray == undefined) {
        window.filtersArray = []
    }
    window.filtersArray.push(filterGifs)
})();