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
        // Replace title and remove links
        const titleElement = container.querySelector("#video-title");
        if (titleElement) {
            titleElement.textContent = "This content has been blocked";
        }

        // Remove all links
        container.querySelectorAll("a")
            .forEach(link => link.removeAttribute("href"));

        // Remove metadata
        container.querySelectorAll("ytd-channel-name, .inline-metadata-item")
            .forEach(el => el.remove());

        // Replace thumbnails
        container.querySelectorAll("ytd-thumbnail img, ytd-playlist-thumbnail img")
            .forEach(img => {
                ContentBlockerUtils.replaceImageSources(img, CONFIG.blockedImageUrl);
            });

        // Replace channel icon
        const channelIcon = container.querySelector("img.yt-spec-avatar-shape__image");
        if (channelIcon) {
            ContentBlockerUtils.replaceImageSources(channelIcon, CONFIG.blockedIconUrl);
        }
    }
}

// Initialize YouTube blocker
ContentBlockerUtils.setupObserver(YouTubeBlocker.checkAndReplaceContent.bind(YouTubeBlocker));
YouTubeBlocker.checkAndReplaceContent();