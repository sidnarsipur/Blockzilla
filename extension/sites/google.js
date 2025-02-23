class GoogleBlocker {
    static checkAndReplaceContent() {
        // Check if we're on a Google search page
        if (!window.location.hostname.includes('google.com')) {
            return;
        }

        // Get all search result containers
        const searchResults = document.querySelectorAll('div.g');
        
        searchResults.forEach(result => {
            const resultText = result.textContent.toLowerCase();
            
            if (CONFIG.blockedWords.some(word => 
                resultText.includes(word.toLowerCase())
            )) {
                this.blockSearchResult(result);
            }
        });
    }

    static blockSearchResult(resultElement) {
        // Create blocking overlay
        const blocker = document.createElement('div');
        blocker.style.cssText = `
            width: 100%;
            min-height: 100px;
            background: #f8f8f8;
            border-radius: 8px;
            margin: 10px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: arial, sans-serif;
            color: #ff4444;
            font-size: 14px;
            font-weight: bold;
            border: 1px solid #dfe1e5;
            position: relative;
            padding: 20px;
            box-sizing: border-box;
        `;
        blocker.textContent = 'Blocked by AI Block';

        // Replace the search result with our blocker
        resultElement.innerHTML = '';
        resultElement.appendChild(blocker);
    }
}

// Initialize
ContentBlockerUtils.setupObserver(GoogleBlocker.checkAndReplaceContent.bind(GoogleBlocker));
GoogleBlocker.checkAndReplaceContent();