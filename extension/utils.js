class ContentBlockerUtils {
    static replaceImageSources(imgElement, newSrc) {
        imgElement.src = newSrc;
        imgElement.removeAttribute("data-src");
        imgElement.removeAttribute("data-srcset");
        imgElement.setAttribute("srcset", newSrc);
    }

    static containsBlockedWord(text) {
        return CONFIG.blockedWords.some(word => 
            text.toLowerCase().includes(word.toLowerCase())
        );
    }

    static setupObserver(checkFunction) {
        const observer = new MutationObserver((mutations) => {
            checkFunction();
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        const images = node.querySelectorAll("img");
                        images.forEach((img) => {
                            if (img.src !== CONFIG.blockedImageUrl && 
                                img.src !== CONFIG.blockedIconUrl) {
                                checkFunction();
                            }
                        });
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["src", "data-src"]
        });

        return observer;
    }
}