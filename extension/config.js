const CONFIG = {
    blockedWords: ["office", "spam", "unwanted", "CS2", "pope", "trump"],
    blockedImageUrl: "https://placehold.co/480x360?text=Blocked",
    blockedText: "Blocked by AI Block",
    blockedTextStyle: `
        font-family: Roboto, sans-serif;
        font-size: 24px;
        font-weight: bold;
        color: #ff4444;
        text-align: center;
        padding: 20px;
        background: #f8f8f8;
        border-radius: 8px;
        margin: 10px 0;
        /* Center positioning */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        max-width: 400px;
        z-index: 10;
    `
};