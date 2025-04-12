export const fetchRssFeed = async (url) => {
  try {
    const response = await fetch(`http://localhost:3001/api/rss?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    throw error;
  }
};
