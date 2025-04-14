# Listenary – Podcast-Based Language Learning Platform

Listenary is a lightweight podcast platform designed to support language learners. It integrates RSS feed parsing, audio playback, speech transcription, inline translation, and vocabulary management to provide an all-in-one "Listen-Read-Translate-Memorize" experience.

## Features
1. Load and parse podcast episodes from any public RSS feed

2. Display podcast metadata (title, publish date, description)

3. Stream audio episodes using an integrated NewsKit player

4. Transcribe audio content via backend service

5. Translate selected transcribed text inline

6. Add translated terms to a personal vocabulary list

7. Persist and review vocabulary entries

## Tech Stack

1. Frontend Framework: React

2. State Management: MobX

3. Audio Player: NewsKit
  
4. Speech to text: Microsoft Azure Speech-to-Text API

5. Languages: JavaScript / CSS / HTML

6. Build Tool: Vite

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
- Player: `/#/podcast-play`### Podcast Features

### Podcast Features

- Channel view: `/#/podcast-channel`
- Player: `/#/podcast-play`

## Sample RSS Feeds

Use the following sample links to test podcast loading and transcription:

Example RSS feeds:

https://feeds.libsyn.com/36668/rss

https://englishminute.com/feed

## Roadmap

1. Add playback history to track user listening progress

2. Integrate dictionary APIs to enhance vocabulary feature

3. Implement a podcast favorites system for quick access

4. Enable user authentication and sync personal vocabulary across devices

5. Improve UI responsiveness and support dark mode

6. Provide RSS feed usage guide for new users

7. Support multiple languages and allow switching between translation APIs
