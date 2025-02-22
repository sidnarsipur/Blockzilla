class TwitterBlocker {
    static checkAndReplaceContent() {
        const tweets = document.querySelectorAll('[data-testid="tweetText"]');
        tweets.forEach(tweet => {
            if (ContentBlockerUtils.containsBlockedWord(tweet.textContent)) {
                tweet.textContent = "This content has been blocked";
            }
        });
    }
}

// Initialize Twitter blocker
ContentBlockerUtils.setupObserver(TwitterBlocker.checkAndReplaceContent.bind(TwitterBlocker));
TwitterBlocker.checkAndReplaceContent();