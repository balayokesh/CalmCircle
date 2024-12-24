# Calm Circle

A Mental Health Companion App that helps users manage their mental well-being through mindfulness, mood tracking, and peer support.

#### Sample .env file  
```
DATABASE_URL=`mongo db atlas URI`  
FRONTEND_URL=`https://localhost:3000`
```
**Note:** FRONTEND_URL is used to whitelist CORS.

#### Sample src/environments/environment.ts file
```
export const environment = {
  production: false,
  apiUrl: '<backend hosted URL>', 
  apiKey: '<your rapid API key>'
};

```

#### API used in this project:
1. [Google Search API](https://rapidapi.com/neoscrap-net/api/google-search72)

