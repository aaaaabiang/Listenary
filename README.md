# vt25-Project

## Setup and Running Instructions

### Install Dependences

npm install

### Backend Setup

1. Run the backend server:

```bash
node backend/server.js
```

### Frontend Setup

1. Start the development server:

```bash
npm run dev
```

## Features and Usage

### RSS Feed Integration

- Homepage: Input RSS link (e.g., conferencesforwomen.org/feed/podcast/)
- Access RSS data:
  - Article content: use `getArticles()`
  - URLs: use `getUrls()`

### Audio Transcription

- Access at: `/#/Transcription`
- Test audio URL: https://crbn.us/whatstheweatherlike.wav

### Podcast Features

- Channel view: `/#/podcast-channel`
- Player: `/#/podcast-play`
