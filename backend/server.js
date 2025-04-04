const express = require("express");
const axios = require("axios");
const Parser = require('rss-parser'); // 添加 RSS 解析器
const parser = new Parser();

const app = express();
const PORT = 3001;

// CORS 设置，允许所有来源访问
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// 代理音频请求
app.get("/proxy", async (req, res) => {
  const audioUrl = req.query.url;
  try {
    const response = await axios.get(audioUrl, { responseType: "stream" });
    res.setHeader("Content-Type", response.headers["content-type"]);
    response.data.pipe(res); // 流式传输响应
  } catch (error) {
    console.error("代理请求失败：", error.message);
    res.status(500).send("代理请求失败：" + error.message);
  }
});

// 添加 RSS feed 解析路由
app.get("/api/rss", async (req, res) => {
  const feedUrl = req.query.url; // 从查询参数获取 RSS feed URL
  
  if (!feedUrl) {
    return res.status(400).json({ error: "RSS feed URL is required" });
  }

  try {
    const feed = await parser.parseURL(feedUrl);
    res.json({
      title: feed.title,
      description: feed.description,
      items: feed.items
    });
  } catch (error) {
    console.error("RSS解析失败：", error.message);
    res.status(500).json({ error: "RSS解析失败: " + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`代理服务器已启动：http://localhost:${PORT}`);
});
