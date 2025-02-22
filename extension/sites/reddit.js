class RedditBlocker {
    static checkAndReplaceContent() {
        const postTitles = document.querySelectorAll('h3[data-testid="post-title"]');
        postTitles.forEach(title => {
            if (ContentBlockerUtils.containsBlockedWord(title.textContent)) {
                title.textContent = "This content has been blocked";
            }
        });
    }
}

// Initialize Reddit blocker
ContentBlockerUtils.setupObserver(RedditBlocker.checkAndReplaceContent.bind(RedditBlocker));
RedditBlocker.checkAndReplaceContent();