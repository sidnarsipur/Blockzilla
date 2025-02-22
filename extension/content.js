const blockedWords = ["office", "spam", "unwanted"];
const BLOCKED_IMAGE_URL = "https://placehold.co/480x360?text=Blocked";
const BLOCKED_ICON_URL = "https://placehold.co/48x48?text=Blocked";

function replaceImageSources(imgElement, newSrc) {
	imgElement.src = newSrc;
	// Prevent future loading by removing common lazy-load attributes
	imgElement.removeAttribute("data-src");
	imgElement.removeAttribute("data-srcset");
	imgElement.setAttribute("srcset", newSrc); // For responsive images
}

function checkAndReplaceContent() {
	if (window.location.hostname.includes("youtube.com")) {
		const videoContainers = document.querySelectorAll(
			"ytd-rich-grid-media, ytd-video-renderer"
		);
		videoContainers.forEach((container) => {
			const titleElement = container.querySelector("#video-title");
			const channelLink = container.querySelector("ytd-channel-name a");

			if (titleElement && channelLink) {
				const titleText = titleElement.textContent.toLowerCase();
				const channelText = channelLink.textContent.toLowerCase();

				if (
					blockedWords.some((word) => titleText.includes(word)) ||
					channelText.includes(word)
				) {
					// Replace title and remove links
					titleElement.textContent = "This content has been blocked";
					container
						.querySelectorAll("a")
						.forEach((link) => link.removeAttribute("href"));

					// Remove channel name and metadata
					container
						.querySelectorAll("ytd-channel-name, .inline-metadata-item")
						.forEach((el) => el.remove());

					// Replace thumbnails
					container
						.querySelectorAll("ytd-thumbnail img, ytd-playlist-thumbnail img")
						.forEach((img) => {
							replaceImageSources(img, BLOCKED_IMAGE_URL);
						});

					// Replace channel icon
					const channelIcon = container.querySelector(
						"img.yt-spec-avatar-shape__image"
					);
					if (channelIcon) {
						replaceImageSources(channelIcon, BLOCKED_ICON_URL);
					}
				}
			}
		});
	}

	// Twitter and Reddit handling remains the same
	// ...
}

// Mutation Observer configuration
const observer = new MutationObserver((mutations) => {
	checkAndReplaceContent();
	// Additional check for images that might load after container processing
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((node) => {
			if (node.nodeType === 1) {
				// Element node
				node.querySelectorAll("img").forEach((img) => {
					if (img.src !== BLOCKED_IMAGE_URL && img.src !== BLOCKED_ICON_URL) {
						const container = img.closest(
							"ytd-rich-grid-media, ytd-video-renderer"
						);
						if (container) checkAndReplaceContent();
					}
				});
			}
		});
	});
});

observer.observe(document.body, {
	childList: true,
	subtree: true,
	attributes: true,
	attributeFilter: ["src", "data-src"],
});

// Initial run
checkAndReplaceContent();
