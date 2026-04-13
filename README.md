# TME Teaching Tool

Interactive surgical teaching app for PGY 4/5 residents reviewing Robotic and Laparoscopic Total Mesorectal Excision.

## Features
- Step-by-step surgical walkthrough (Laparoscopic & Robotic)
- Pitfalls and pearls for each step
- Peer-reviewed video links (Herrando et al. DC&R 2022)
- 10-question oral board-style quiz
- Quirke grading reference
- Key literature and video library

## Local development

```bash
npm install
npm run dev
```

## Deploy to Netlify

1. Push this folder to a GitHub repository
2. Log in to [netlify.com](https://netlify.com)
3. Click **Add new site → Import an existing project**
4. Connect your GitHub repo
5. Build settings are pre-configured in `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click **Deploy site**

Your app will be live at a Netlify URL within ~2 minutes.

## Built with
- React 18
- Vite
- Tailwind CSS
