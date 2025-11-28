(() => {
    const filterReplies = (items) => {
        const userId = items[0]?.item?.itemContent?.tweet_results?.result?.core?.user_results?.result?.rest_id
        return items.filter((item) => {
            return item?.item?.itemContent?.tweet_results?.result?.legacy?.entities?.user_mentions != userId
        })
    }

    if (window.filtersArray == undefined) {
        window.filtersArray = []
    }
    window.filtersArray.push(filterReplies)
})();
