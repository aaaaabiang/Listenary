import { fetchRssFeed } from './services';

function formatDuration(duration) {
  if (!duration) return 'Unknown';

  if (typeof duration === 'number') {
    const m = Math.floor(duration / 60);
    const s = duration % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  if (typeof duration === 'string') {
    if (/^\d+$/.test(duration)) {
      // 纯数字秒数
      return formatDuration(Number(duration));
    }
    if (/^\d{1,2}:\d{2}$/.test(duration) || /^\d{1,2}:\d{2}:\d{2}$/.test(duration)) {
      // 已是标准格式
      return duration;
    }
  }

  return 'Unknown';
}

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
          // duration: item.itunes?.duration,//时长无法显示
          duration: formatDuration(item.itunes?.duration),
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