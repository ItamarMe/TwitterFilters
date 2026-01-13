(() => {
    const filterReplies = (items) => {        
        return items.filter((item) => {            
            return item?.item?.itemContent?.tweet_results?.result?.legacy?.entities?.user_mentions.length == 0
        })
    }

    if (window.filtersArray == undefined) {
        window.filtersArray = []
    }
    window.filtersArray.push(filterReplies)
})();
