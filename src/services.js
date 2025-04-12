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
