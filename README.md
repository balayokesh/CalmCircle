# Calm Circle

A Mental Health Companion App that helps users manage their mental well-being through mindfulness, mood tracking, and peer support.

### Live Preview:
Frontend hosted using gh-pages: [https://balayokesh.github.io/CalmCircle/](https://balayokesh.github.io/CalmCircle/)  

### Steps to run the application locally:
#### Requirements:
MongoDB Atlas URI, RapidAPI API key with [Google Search API](https://rapidapi.com/neoscrap-net/api/google-search72) enabled.
#### To start the frontend:
Inside `/src/environments/` rename `environment.example.ts` to `environment.ts` and fill in the required details.

```
npm install --force
ng serve
```
#### To start backend:
Inside `/server` Rename `.env.example` to `.env` and fill in the required details  
```
cd server
node server.js
```

### Tech Stack:
Angular, NodeJs, expressJs, MongoDB, [Google Search API](https://rapidapi.com/neoscrap-net/api/google-search72)
