class GeneralBlocker {
    static checkAndReplaceContent() {
        // Don't run on YouTube, Reddit, or Twitter
        if (window.location.hostname.includes('youtube.com') ||
            window.location.hostname.includes('reddit.com') ||
            window.location.hostname.includes('twitter.com')) {
            return;
        }

        // Get all text content from the page
        const textContent = document.body.innerText.toLowerCase();
        const words = CONFIG.blockedWords;

        if (words) {
            // Find all matching blocked words
            const foundWords = words.filter(word => 
                textContent.includes(word.toLowerCase())
            );

            // Only block if 5 or more words are found
            if (foundWords.length >= 5) {
                this.redirectToBlockedPage(foundWords);
            }
        }
    }

    static redirectToBlockedPage() {
        const blockedPageURL = chrome.runtime.getURL('resources/blocked-general.html');
        window.location.href = blockedPageURL;
    }
}

// Initialize
ContentBlockerUtils.setupObserver(GeneralBlocker.checkAndReplaceContent.bind(GeneralBlocker));
GeneralBlocker.checkAndReplaceContent();