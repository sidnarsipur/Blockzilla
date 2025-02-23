class RedditBlocker {
    static checkAndReplaceContent() {
        const posts = document.querySelectorAll('shreddit-post');
        posts.forEach(post => {
            const screenReaderContent = post.querySelector('faceplate-screen-reader-content');
            if (screenReaderContent && ContentBlockerUtils.containsBlockedWord(screenReaderContent.textContent)) {
                const postContainer = post.closest('article');
                if (postContainer) {
                    // Create blocked content wrapper
                    const wrapper = document.createElement('div');
                    wrapper.style.cssText = `
                        position: relative;
                        width: 100%;
                        background: var(--color-neutral-background);
                        border-radius: 16px;
                        margin: 4px 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 200px;
                        overflow: hidden;
                    `;

                    // Create blurred background
                    const blurredContent = document.createElement('div');
                    const blurImageUrl = chrome.runtime.getURL('resources/reddit-blur.png');
                    blurredContent.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-image: url('${blurImageUrl}');
                        background-size: contain;
                        background-position: center;
                        background-repeat: no-repeat;
                        border-radius: 12px;
                    `;

                    // Create blocked message
                    const blockedDiv = document.createElement('div');
                    blockedDiv.textContent = CONFIG.blockedText;
                    blockedDiv.style.cssText = `
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-family: 'Roboto', sans-serif;
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: var(--color-neutral-content-strong);
                        text-align: center;
                        max-width: 85%;
                        z-index: 2;
                    `;

                    // Assemble the components
                    wrapper.appendChild(blurredContent);
                    wrapper.appendChild(blockedDiv);
                    postContainer.innerHTML = '';
                    postContainer.appendChild(wrapper);
                    postContainer.style.pointerEvents = 'none';
                }
            }
        });
    }
}

// Initialize Reddit blocker
ContentBlockerUtils.setupObserver(RedditBlocker.checkAndReplaceContent.bind(RedditBlocker));
RedditBlocker.checkAndReplaceContent();