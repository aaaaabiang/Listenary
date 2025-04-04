import { useEffect } from 'react';
import { RssModel } from '../rssModel';

export const RssPresenter = () => {
  useEffect(() => {
    async function extractRssData() {
      const rssModel = new RssModel();
      try {
        const { urls, articles } = await rssModel.loadFeed('https://feeds.bbci.co.uk/news/rss.xml');
        
        // URLs仅在后台使用
        console.log('Backend URLs:', urls);
        
        // 文章信息将用于前端展示
        console.log('Frontend Articles Data:', articles);
        
        // 这里可以存储articles数据，供后续页面展示使用
        
      } catch (error) {
        console.error('RSS数据提取失败:', error);
      }
    }
    
    extractRssData();
  }, []);

  // 暂时返回空组件，稍后添加展示逻辑
  return <div>RSS Data Extractor</div>;
}
