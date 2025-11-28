(() => {
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method, url) {
        this._interceptUrl = url;
        return originalOpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function (body) {
        if (this._interceptUrl.includes("/UserMedia?")) {
            Object.defineProperty(this, 'responseText', {
                get: () => {
                    const original = Reflect.get(XMLHttpRequest.prototype, 'responseText', this);

                    if (this.readyState === 4 && this.status === 200) {
                        try {
                            const jsonOG = JSON.parse(original)
                            
                            let originalEntries, isInitial;

                            if (originalEntries = getInitial(jsonOG)) isInitial = true
                            else if (originalEntries = getProceedial(jsonOG)) isInitial = false
                            else throw new Error("could not find items")
                            console.log(window.filtersArray);
                            
                            console.log({originalEntries})
                            let filtered = originalEntries
                            window.filtersArray.forEach((filter) => {
                                filtered = filter(filtered)
                            })
                            console.log({ filtered })

                            if (isInitial) setInitial(jsonOG, filtered)
                            else setProceedial(jsonOG, filtered)

                            return JSON.stringify(jsonOG);
                        }
                        catch (e) {
                            console.debug({ e })
                        }
                    }

                    return original;
                },
            });
        };

        return originalSend.apply(this, arguments);
    }
})();

const getInitial = (jsonOG) => {
    return jsonOG?.data?.user?.result?.timeline?.timeline?.instructions[2]?.entries[0]?.content?.items
}

const getProceedial = (jsonOG) => {
    return jsonOG?.data?.user?.result?.timeline?.timeline?.instructions[0]?.moduleItems
}

const setInitial = (newText, filtered) => {
    newText.data.user.result.timeline.timeline.instructions[2].entries[0].content.items = filtered
}

const setProceedial = (newText, filtered) => {
    newText.data.user.result.timeline.timeline.instructions[0].moduleItems = filtered
}