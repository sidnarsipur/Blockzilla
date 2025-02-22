class RedditBlocker {
    static checkAndReplaceContent() {
        const posts = document.querySelectorAll('shreddit-post');
        posts.forEach(post => {
            const screenReaderContent = post.querySelector('faceplate-screen-reader-content');
            if (screenReaderContent && ContentBlockerUtils.containsBlockedWord(screenReaderContent.textContent)) {
                // Block the entire post container
                const postContainer = post.closest('article');
                if (postContainer) {
                    // Create blocked content wrapper
                    const wrapper = document.createElement('div');
                    wrapper.style.cssText = `
                        position: relative;
                        width: 100%;
                        background: var(--color-neutral-background);
                        border-radius: 16px;
                        padding: 16px;
                        margin: 4px 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 100px;
                    `;

                    // Create blocked message
                    const blockedDiv = document.createElement('div');
                    blockedDiv.textContent = CONFIG.blockedText;
                    blockedDiv.style.cssText = `
                        font-size: 16px;
                        font-weight: 500;
                        color: var(--color-neutral-content-strong);
                        text-align: center;
                    `;

                    // Replace entire post content
                    wrapper.appendChild(blockedDiv);
                    postContainer.innerHTML = '';
                    postContainer.appendChild(wrapper);

                    // Remove pointer events
                    postContainer.style.pointerEvents = 'none';
                }
            }
        });
    }
}

// Initialize Reddit blocker
ContentBlockerUtils.setupObserver(RedditBlocker.checkAndReplaceContent.bind(RedditBlocker));
RedditBlocker.checkAndReplaceContent();