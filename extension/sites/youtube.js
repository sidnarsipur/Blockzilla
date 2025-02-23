class YouTubeBlocker {
    static checkAndReplaceContent() {
        // Check if we're on a video page
        if (window.location.pathname === '/watch') {
            this.checkVideoPage();
        } else {
            // Handle homepage and search results
            this.checkGridContent();
        }
    }

    static async checkVideoPage() {
        // Get video title
        const titleElement = document.querySelector('h1.ytd-video-primary-info-renderer');
        const descriptionElement = document.querySelector('#description-inline-expander');
        const commentsSection = document.querySelector('#comments');
        
        if (titleElement) {
            const titleText = titleElement.textContent;
            const descriptionText = descriptionElement ? descriptionElement.textContent : '';
            
            // Check title and description
            if (ContentBlockerUtils.containsBlockedWord(titleText) || 
                ContentBlockerUtils.containsBlockedWord(descriptionText)) {
                this.redirectToBlockedPage();
                return;
            }

            // Check comments if they exist
            if (commentsSection) {
                const commentTexts = Array.from(commentsSection.querySelectorAll('#content-text'))
                    .map(comment => comment.textContent);
                
                for (const commentText of commentTexts) {
                    if (ContentBlockerUtils.containsBlockedWord(commentText)) {
                        this.redirectToBlockedPage();
                        return;
                    }
                }
            }
        }
    }

    static checkGridContent() {
        // Code for homepage and search results
        const videoContainers = document.querySelectorAll(
            "ytd-rich-grid-media, ytd-video-renderer"
        );

        videoContainers.forEach((container) => {
            const titleElement = container.querySelector("#video-title");
            const channelLink = container.querySelector("ytd-channel-name a");

            if (titleElement && channelLink) {
                const titleText = titleElement.textContent;
                const channelText = channelLink.textContent;

                if (ContentBlockerUtils.containsBlockedWord(titleText) ||
                    ContentBlockerUtils.containsBlockedWord(channelText)) {
                    this.blockContainer(container);
                }
            }
        });
    }

    static preventClicks(element) {
        // Prevent all possible click and interaction events
        element.style.pointerEvents = 'none';
        element.style.userSelect = 'none';
        element.addEventListener('click', e => e.stopPropagation(), true);
        element.addEventListener('mousedown', e => e.stopPropagation(), true);
        element.addEventListener('mouseup', e => e.stopPropagation(), true);
        element.addEventListener('touchstart', e => e.stopPropagation(), true);
        element.addEventListener('touchend', e => e.stopPropagation(), true);

        // Remove href and other interactive attributes
        element.removeAttribute('href');
        element.removeAttribute('aria-label');
        element.classList.remove('yt-simple-endpoint');

        // Remove role attributes
        element.removeAttribute('role');

        // If it's an anchor or button, make it non-interactive
        if (element.tagName.toLowerCase() === 'a' || element.tagName.toLowerCase() === 'button') {
            element.style.cursor = 'default';
            element.onclick = null;
            element.onmousedown = null;
            element.onmouseup = null;
            if (element.tagName.toLowerCase() === 'button') {
                element.disabled = true;
            }
        }
    }

    static blockContainer(container) {
        // Make container relative for absolute positioning
        container.style.position = 'relative';
        container.style.minHeight = '200px';

        // Remove all links and clickable elements first
        this.preventClicks(container);

        // Replace thumbnail section
        const thumbnailSection = container.querySelector("#thumbnail");
        if (thumbnailSection) {
            // Remove all timestamp-related elements
            const timestampSelectors = [
                "ytd-thumbnail-overlay-time-status-renderer",
                ".thumbnail-overlay-badge-shape",
                ".badge-shape-wiz--thumbnail-badge",
                "#time-status"
            ];

            timestampSelectors.forEach(selector => {
                thumbnailSection.querySelectorAll(selector).forEach(element => {
                    element.remove();
                });
            });

            // Replace images
            thumbnailSection.querySelectorAll("img").forEach(img => {
                img.style.boxSizing="border-box";
                img.style.borderRadius="15px";
                img.style.border="2px solid #ccc";
                ContentBlockerUtils.replaceImageSources(img, CONFIG.blockedImageUrl);
            });
        }

        // Handle both grid and list view content sections
        const detailsSection = container.querySelector("#details");
        const textWrapper = container.querySelector(".text-wrapper");

        if (detailsSection || textWrapper) {
            const targetElement = detailsSection || textWrapper;

            // Create wrapper for better positioning
            const wrapper = document.createElement('div');
            wrapper.style.cssText = `
                position: relative;
                width: 100%;
                height: 100%;
                min-height: ${textWrapper ? '150px' : '100px'};
            `;

            const blockedDiv = document.createElement('div');
            blockedDiv.textContent = CONFIG.blockedText;
            blockedDiv.style.cssText = CONFIG.blockedTextStyle;

            wrapper.appendChild(blockedDiv);
            targetElement.innerHTML = '';
            targetElement.appendChild(wrapper);
        }

        // Clean up any remaining elements
        const elementsToRemove = container.querySelectorAll(`
            ytd-channel-name,
            #metadata,
            #metadata-line,
            #description-text,
            .metadata-snippet-container,
            .metadata-snippet-text,
            #channel-info,
            #badges,
            #menu,
            .inline-metadata-item,
            #title-wrapper,
            #meta,
            #expandable-metadata,
            #buttons
        `);

        elementsToRemove.forEach(el => el.remove());

        // Remove all links and interactive elements
        container.querySelectorAll('a, button, ytd-button-renderer')
            .forEach(element => {
                element.removeAttribute('href');
                element.style.pointerEvents = 'none';
            });

        // Specifically handle video title links
        const videoTitle = container.querySelector("#video-title");
        if (videoTitle) {
            videoTitle.style.pointerEvents = 'none';
            videoTitle.querySelector('yt-formatted-string').textContent = 'Content Blocked';
        }
    }

    static redirectToBlockedPage() {
        // Get the extension's blocked.html URL
        const blockedPageURL = chrome.runtime.getURL('resources/blocked-yt.html');
        window.location.href = blockedPageURL;
    }
}

// Initialize
ContentBlockerUtils.setupObserver(YouTubeBlocker.checkAndReplaceContent.bind(YouTubeBlocker));
YouTubeBlocker.checkAndReplaceContent();