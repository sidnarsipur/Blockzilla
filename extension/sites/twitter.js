class TwitterBlocker {
    static checkAndReplaceContent() {
        // Log that the function is running
        console.log('TwitterBlocker.checkAndReplaceContent() called');

        // Try different selectors and log the results
        const tweets = document.querySelectorAll('article');
        console.log('Found tweets:', tweets.length);

        tweets.forEach((tweet, index) => {
            console.log(`Checking tweet ${index + 1}:`);

            // Try to get all text content from the tweet
            console.log('Full tweet content:', tweet.textContent);

            // Check for text content with different selectors
            const possibleTextElements = [
                tweet.querySelector('[data-testid="tweetText"]'),
                tweet.querySelector('.css-175oi2r [lang="en"]'),
                tweet.querySelector('[data-testid="tweet"] div[lang]')
            ];

            const possibleUserElements = [
                tweet.querySelector('[data-testid="User-Name"]'),
                tweet.querySelector('.css-1jxf684.r-poiln3.r-bcqeeo.r-1pos5eu'),
                tweet.querySelector('[data-testid="tweet"] a[role="link"] div[dir="ltr"]')
            ];

            console.log('Text elements found:', possibleTextElements.map(el => el?.textContent));
            console.log('User elements found:', possibleUserElements.map(el => el?.textContent));

            // Log the complete HTML structure of the tweet for debugging
            console.log('Tweet HTML structure:', tweet.innerHTML);
        });
    }
}

// Initialize Twitter blocker
console.log('Initializing TwitterBlocker...');
ContentBlockerUtils.setupObserver(TwitterBlocker.checkAndReplaceContent.bind(TwitterBlocker));
TwitterBlocker.checkAndReplaceContent();