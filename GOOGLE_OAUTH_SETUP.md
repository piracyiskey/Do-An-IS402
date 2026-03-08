# Google OAuth Setup Instructions

## Current Issue
Google Sign-In requires a **Client Secret** to work properly with the server-side OAuth flow.

## How to Get Your Google Client Secret

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Select Your Project**
   - Choose the project with your OAuth client ID

3. **Navigate to Credentials**
   - In the left menu: APIs & Services → Credentials

4. **Find Your OAuth 2.0 Client**
   - Look for the client ID: `518525301067-6vci81s4s8eo4klif1rmj18rl8o216po`

5. **Get the Client Secret**
   - Click on the OAuth client name
   - You'll see both:
     - **Client ID** (you already have this)
     - **Client Secret** (this is what you need)
   - Copy the Client Secret

6. **Add to Backend .env File**
   - Open: `is-web-project/.env`
   - Find the line: `GOOGLE_CLIENT_SECRET=`
   - Paste your secret after the `=`
   - Example: `GOOGLE_CLIENT_SECRET=YOUR_SECRET_HERE`

7. **Restart the Backend**
   ```bash
   cd is-web-project
   docker-compose restart app
   ```

## Verify Setup

After adding the secret:
1. Go to your app's login page
2. Click "Sign in with Google"
3. Complete Google authentication
4. You should be redirected back and logged in successfully

## Important Notes

- **Never commit the Client Secret to Git** - it's already in .gitignore
- The redirect URI must match exactly: `http://localhost:5173/auth/callback`
- Make sure this redirect URI is added in Google Cloud Console
