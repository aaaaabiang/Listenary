import { fetchRssFeed } from './services';

export class RssModel {
  constructor() {
    this.feeds = [];
    this.urls = [];  // 后台使用的URLs
    this.articles = [];  // 存储文章详细信息，用于前端展示
    this.subscribers = [];
  }

  loadFeed(url, callback) {
    fetch(`http://localhost:3001/api/rss?url=${encodeURIComponent(url)}`)
      .then(response => response.json())
      .then(data => {
        this.feeds = data.items;
        
        // 提取URLs（后台使用）
        this.urls = data.items.map(item => item.link).filter(Boolean);
        
        // 提取文章信息（前端展示用）
        this.articles = data.items.map(item => ({
          title: item.title,
          author: item.creator || item.author || 'Unknown',  // RSS源可能使用不同的字段表示作者
          date: item.pubDate || item.isoDate,  // 使用发布日期
          description: item.contentSnippet || item.description,  // 文章描述/摘要
        }));
        
        // 分别打印后台和前端数据
        console.log('后台使用的URLs:', this.urls);
        console.log('前端展示的文章信息:', this.articles);
        
        this.notifySubscribers();
        
        // 通过回调返回数据
        callback(null, {
          urls: this.urls,
          articles: this.articles
        });
      })
      .catch(error => {
        console.error('Error loading RSS feed:', error);
        callback(error, null);
      });
  }

  // 获取URLs（后台使用）
  getUrls() {
    return this.urls;
  }

  // 获取文章信息（前端使用）
  getArticles() {
    return this.articles;
  }
  
  //订阅者模式
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

// 测试函数
function testRssParser() {
    fetchRssFeed('https://feeds.bbci.co.uk/news/rss.xml', (error, feedData) => {
      if (error) {
        console.error('测试失败:', error);
        return;
      }
      console.log('RSS Feed 标题:', feedData.title);
      console.log('RSS Feed 描述:', feedData.description);
      console.log('第一条内容:', feedData.items[0]);
    });
  }
  
  testRssParser();
  