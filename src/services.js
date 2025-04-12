// Service function to fetch RSS feed data
export const fetchRssFeed = (url, callback) => {
  fetch(`http://localhost:3001/api/rss?url=${encodeURIComponent(url)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      callback(null, {
        title: data.title,
        description: data.description,
        items: data.items
      });
    })
    .catch(error => {
      console.error('Error fetching RSS feed:', error);
      callback(error, null);
    });
};

// Test function for RSS parser
// Example usage with BBC News RSS feed
function testRssParser() {
  // Test with BBC News feed URL
  const testUrl = 'https://feeds.bbci.co.uk/news/rss.xml';
  
  fetchRssFeed(testUrl, (error, feedData) => {
    if (error) {
      console.error('Test failed:', error);
      return;
    }
    // Log successful test results
    console.log('Test successful:');
    console.log('- RSS Feed Title:', feedData.title);
    console.log('- RSS Feed Description:', feedData.description);
    console.log('- First Article:', feedData.items[0]);
  });
}

// Run the test
testRssParser();

