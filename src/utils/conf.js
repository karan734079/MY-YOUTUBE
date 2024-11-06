const conf = {
    googleApi: process.env.REACT_APP_GOOGLE_API_KEY,
    youtubeVideoApi: process.env.REACT_APP_YOUTUBE_VIDEO_API, // Used for fetching video data
    youtubeSearchApi: process.env.REACT_APP_YOUTUBE_SEARCH_API, // Correct API for search suggestions
    searchResultApi: process.env.REACT_APP_SEARCH_RESULT_API, // Used for search results
    liveChat: process.env.REACT_APP_LIVE_CHAT,
};

export default conf;
