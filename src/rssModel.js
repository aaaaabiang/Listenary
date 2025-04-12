import { fetchRssFeed } from './services';

export class RssModel {
  constructor() {
    this.feed = null;
    this.items = [];
    this.subscribers = [];
  }

  loadFeed(url, callback) {
    fetch(`http://localhost:3001/api/rss?url=${encodeURIComponent(url)}`)
      .then(response => response.json())
      .then(data => {
        this.feed = {
          title: data.title,
          description: data.description,
          image: data.image,
          link: data.link
        };
        
        this.items = data.items.map(item => ({
          title: item.title,
          description: item.contentSnippet || item.description,
          pubDate: item.pubDate || item.isoDate,
          duration: item.itunes?.duration,
          episode: item.itunes?.episode,
          season: item.itunes?.season,
          image: item.itunes?.image || data.image,
          guid: item.guid,
          link: item.link,
          enclosure: item.enclosure
        }));
        
        this.notifySubscribers();
        
        callback(null, {
          ...this.feed,
          items: this.items
        });
      })
      .catch(error => {
        console.error('Error loading RSS feed:', error);
        callback(error, null);
      });
  }

  getFeedInfo() {
    return this.feed;
  }

  getEpisodes() {
    return this.items;
  }
  
  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this));
  }
}