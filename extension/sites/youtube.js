class YouTubeBlocker {
    static checkAndReplaceContent() {
        // Handle both grid view and list view
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
        // Make container relative for absolute positioning
        container.style.position = 'relative';
        container.style.minHeight = '200px';

        // Replace thumbnail section
        const thumbnailSection = container.querySelector("#thumbnail");
        if (thumbnailSection) {
            thumbnailSection.querySelectorAll("img").forEach(img => {
                ContentBlockerUtils.replaceImageSources(img, CONFIG.blockedImageUrl);
                // Style the blocked image
                img.style.opacity = '0.5';
                img.style.filter = 'blur(3px)';
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
            blockedDiv.textContent = "Removed By AI BLOCK";
            blockedDiv.style.cssText = CONFIG.blockedTextStyle;
            
            // Adjust position based on view type
            if (textWrapper) {
                blockedDiv.style.width = '60%';
                blockedDiv.style.maxWidth = '300px';
            }
            
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
}

// Initialize
ContentBlockerUtils.setupObserver(YouTubeBlocker.checkAndReplaceContent.bind(YouTubeBlocker));
YouTubeBlocker.checkAndReplaceContent();