class YouTubeBlocker {
    static checkAndReplaceContent() {
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

    static blockContainer(container) {
        // Replace thumbnail section
        const thumbnailSection = container.querySelector("#thumbnail");
        if (thumbnailSection) {
            thumbnailSection.querySelectorAll("img").forEach(img => {
                ContentBlockerUtils.replaceImageSources(img, CONFIG.blockedImageUrl);
            });
        }

        // Handle the text content section
        const textWrapper = container.querySelector(".text-wrapper");
        if (textWrapper) {
            // Create replacement div
            const blockedDiv = document.createElement('div');
            blockedDiv.textContent = "Removed By AI BLOCK";
            blockedDiv.style.cssText = CONFIG.blockedTextStyle;
            
            // Replace the entire text wrapper
            textWrapper.innerHTML = '';
            textWrapper.appendChild(blockedDiv);
        }

        // Alternative approach for rich grid media layout
        const detailsSection = container.querySelector("#details");
        if (detailsSection) {
            const blockedDiv = document.createElement('div');
            blockedDiv.textContent = "Removed By AI BLOCK";
            blockedDiv.style.cssText = CONFIG.blockedTextStyle;
            
            detailsSection.innerHTML = '';
            detailsSection.appendChild(blockedDiv);
        }

        // Clean up any remaining elements that might contain sensitive content
        const elementsToRemove = container.querySelectorAll(`
            ytd-channel-name,
            #metadata,
            #metadata-line,
            #description-text,
            .metadata-snippet-container,
            #channel-info,
            #badges,
            #menu,
            .inline-metadata-item
        `);
        
        elementsToRemove.forEach(el => el.remove());

        // Remove all links and interactive elements
        container.querySelectorAll('a, button, ytd-button-renderer')
            .forEach(element => {
                element.removeAttribute('href');
                element.style.pointerEvents = 'none';
            });
    }
}

// Initialize YouTube blocker
ContentBlockerUtils.setupObserver(YouTubeBlocker.checkAndReplaceContent.bind(YouTubeBlocker));
YouTubeBlocker.checkAndReplaceContent();