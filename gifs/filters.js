// items = jsonOG?.data?.user?.result?.timeline?.timeline? and .instructions[0]?.moduleItems || .instructions[2]?.entries[0]?.content?.items

export const filterGifs = (items) => {
    const blockedTypes = ["animated_gif"];
    return items.filter((item) => {
        const type = item?.item?.itemContent?.tweet_results?.result?.legacy?.entities?.media[0]?.type
        return !blockedTypes.includes(type)
    })
}

export const filterReplies = (items) => {
    const userId = items[0]?.item?.itemContent?.tweet_results?.result?.core?.user_results?.result?.rest_id
    return items.filter((item) => {
        return item?.item?.itemContent?.tweet_results?.result?.legacy?.entities?.user_mentions != userId
    })
}