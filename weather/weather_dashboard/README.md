## Weather Glass – Weatherstack Demo

This is a small React single-page app built with Vite that uses the **Weatherstack API** to display:

- Current weather  
- Historical weather (by date)  
- Marine weather (by latitude/longitude)  

The UI uses a **glassmorphic** design with translucent cards, blurred backgrounds, and soft gradients.

### Tech stack

- React 18
- Vite
- Vanilla CSS (glassmorphism theme)

### Weatherstack API

The app calls the Weatherstack REST API as described in the official docs \(`https://docs.apilayer.com/weatherstack/docs/api-documentation?utm_source=WeatherstackHomePage&utm_medium=Referral`\) for:

- `/current` – real-time weather for a location  
- `/historical` – weather for a given date  
- `/marine` – marine weather by coordinates  

> Note: the API key is currently hard-coded in `src/api/weatherstack.js` for simplicity. For production, move it to environment variables.

### Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

