# Simple Notes PWA

A simple Progressive Web App (PWA) for taking notes that works both online and offline.

## Features

- Add and delete notes
- Notes are stored locally (works offline)
- Mobile-responsive design
- Installable as an app on phones
- Works offline using service worker caching

## Deploy to GitHub Pages

1. **Create a GitHub repository**
   - Go to https://github.com and create a new repository
   - Name it something like `notes-app`

2. **Upload the files**
   - Upload these files to your repository:
     - `index.html`
     - `styles.css`
     - `app.js`
     - `manifest.json`
     - `service-worker.js`

3. **Enable GitHub Pages**
   - Go to your repository Settings
   - Click on "Pages" in the left sidebar
   - Under "Build and deployment" > "Source", select "Deploy from a branch"
   - Under "Branch", select `main` (or `master`) and folder `/ (root)`
   - Click Save

4. **Your app will be live at:**
   ```
   https://yourusername.github.io/notes-app/
   ```

## How to Use

- Open the URL on your phone
- Add notes using the input field
- Tap "Add Note" to save
- Tap × to delete a note
- On mobile: use "Add to Home Screen" to install as an app

## PWA Features

- **Offline Support**: The app caches itself and works without internet connection
- **Installable**: On mobile devices, users can "Add to Home Screen" to install it as an app
- **Responsive**: Optimized for mobile phones

## Browser Support

Works on modern browsers that support:
- Service Workers
- Web App Manifest
- Local Storage

## Files

- `index.html` - Main HTML file
- `styles.css` - CSS styling
- `app.js` - JavaScript functionality
- `manifest.json` - PWA manifest
- `service-worker.js` - Service worker for offline caching

## Adding Icons

To make the PWA fully installable, add icon files:
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

You can generate these using online tools like:
- https://favicon.io/favicon-generator/
- https://www.favicon-generator.org/

Then update `manifest.json` to include the icons array.