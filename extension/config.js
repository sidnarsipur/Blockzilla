const CONFIG = {
    blockedWords: [],  // Will be populated from server
    blockedImageUrl: "https://i.ibb.co/bgSw8GWj/plfu8-T65-VY.png",
    blockedText: "This content isn’t available, but let's try something else!",
    blockedTextStyle: `
        font-family: Roboto, sans-serif;
        font-size: 1.875rem;
        font-weight: bold;
        text-align: center;
        border-radius: 8px;
        width: 100%;
        max-width: 400px;
        z-index: 10;
    `
};

// Function to fetch blocked words from server
async function updateBlockedWords() {
    try {
        const userId = 'sRJis8S0RVC68dti8pg7';
        const url = `http://localhost:5000/getBlockedWords?userId=${userId}`;
        console.log('Attempting to fetch from:', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            mode: 'cors'
        });
        
        if (!response.ok) {
            console.error('Server response:', response.status, response.statusText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const words = await response.json();
        console.log('Successfully fetched words:', words);
        CONFIG.blockedWords = words;
        
        // Store in chrome.storage.local
        chrome.storage.local.set({ blockedWords: words }, () => {
            if (chrome.runtime.lastError) {
                console.error('Storage error:', chrome.runtime.lastError);
            } else {
                console.log('Words stored in Chrome storage');
            }
        });
    } catch (error) {
        console.error('Fetch error:', error);
        // Try to load from storage as fallback
        chrome.storage.local.get(['blockedWords'], (result) => {
            if (chrome.runtime.lastError) {
                console.error('Storage fallback failed:', chrome.runtime.lastError);
            } else if (result.blockedWords) {
                CONFIG.blockedWords = result.blockedWords;
                console.log('Loaded fallback words from storage:', result.blockedWords);
            }
        });
    }
}

// Initial fetch
updateBlockedWords();

// Refresh every 5 minutes
setInterval(updateBlockedWords, 5 * 60 * 1000);

// Make CONFIG globally available
window.CONFIG = CONFIG;