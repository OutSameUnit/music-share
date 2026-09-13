# Music Share Project Context

## 1. Project Overview

Music Share is a family-oriented music and video sharing app.

Goals:
- Gmail/GitHub login support via Supabase Auth
- Create and manage playlists
- Upload music/video files
- Favorite playlists
- Share playlists with family members
- Play media with custom controls
- Host frontend on GitHub Pages
- Use Supabase for auth and database
- Use Cloudinary for video hosting and delivery

---

## 2. Current Stack

- Frontend: HTML, CSS, JavaScript
- Hosting: GitHub Pages
- Auth: Supabase Auth
- Database: Supabase Database
- Media hosting: Cloudinary
- Local fallback mode: browser localStorage

---

## 3. Current App Structure

- `index.html`
- `styles.css`
- `app.js`
- `config.js`
- `supabase-schema.sql`
- `service-worker.js`
- `manifest.webmanifest`

---

## 4. Current Status

The app currently includes:
- a responsive home, my music, and favorites view
- recent music and public playlist lists
- Supabase Auth with Google and GitHub providers
- Supabase-backed profiles, playlists, favorites, and uploaded music when configured
- Cloudinary upload and thumbnail handling when configured
- localStorage fallback for local-first use
- custom play controls, queue playback, shuffle, and repeat modes
- mobile bottom-sheet queue with full-width layout, collapse controls, and automatic scroll-to-top on open
- mobile playlist panels with whole-header toggles
- mobile uploaded-music cards with wrapped titles, single-line dates, and horizontally scrollable actions

The app keeps local-first behavior as a fallback while using Supabase and Cloudinary for production data and media when configured.

---

## 5. Production Configuration

The project uses `src/config.js` for environment-specific values.

Example format:

```js
window.MUSIC_SHARE_CONFIG = {
  supabase: {
    url: 'https://YOUR_PROJECT_REF.supabase.co',
    anonKey: 'YOUR_SUPABASE_ANON_KEY',
  },
  cloudinary: {
    cloudName: 'YOUR_CLOUD_NAME',
    uploadPreset: 'YOUR_UNSIGNED_PRESET',
  },
  app: {
    mode: 'local-first',
  },
};
```

Important:
- Keep public values in this file.
- Never commit secret service-role credentials in the frontend.
- Keep RLS and auth rules enforced in Supabase.

---

## 6. Production Architecture

### Frontend
- GitHub Pages
- Static UI and JavaScript app

### Authentication
- Supabase Auth
- GitHub login support
- Google/Gmail login support can also be added

### Database
- Supabase Database
- profiles, playlists, playlist_items, favorite_playlists tables
- video_uploads, track_favorites, and track_play_events tables

### Media
- Cloudinary for uploads, delivery, and thumbnails
- Local fallback values are retained when cloud configuration is unavailable

---

## 7. Recommended Data Model

### profiles
- id
- email
- full_name
- avatar_url
- created_at

### playlists
- id
- user_id
- name
- description
- is_public
- is_family_only
- created_at
- updated_at

### playlist_items
- id
- playlist_id
- title
- url
- thumbnail_url
- order_index
- created_at

### favorites
- id
- user_id
- playlist_id
- created_at

---

## 8. Current Known Constraints

- GitHub Pages is static hosting; it cannot run server-side logic.
- The current app is local-first and intentionally does not require a backend yet.
- Production media delivery should use Cloudinary, not raw GitHub-hosted video files.
- Auth, per-user playlists, and favorites should eventually be stored in Supabase.
- RLS must be enabled in Supabase to protect user data.

---

## 9. Current Development Priorities

### High priority
- Connect Supabase Auth to the app
- Create Supabase DB tables
- Add RLS rules
- Connect Cloudinary uploads
- Replace localStorage playlist persistence with Supabase-backed storage
- Save favorites to Supabase
- Share playlist links with restricted visibility

### Medium priority
- search and filtering
- playlist editing
- playlist reordering
- recent history
- better mobile UX

### Lower priority
- comments
- analytics
- recommendations
- PWA installability
- offline playback

---

## 10. How to Ask Another AI for Help

When asking another AI for help, include the following:

### Required
- project purpose
- current tech stack
- relevant files
- exact error or symptom
- expected behavior vs actual behavior
- what has already been tried
- whether the app is in local-first mode or production mode

### Recommended
- a snippet of the code around the problem
- the environment values with secret parts masked
- any recent logs or console output

### Example prompt

```text
I am building a family music sharing app using GitHub Pages + Supabase + Cloudinary.
Current app files:
- src/index.html
- src/app.js
- src/config.js
- src/styles.css

Issue: GitHub login is not completing in the app.
Expected: user is logged in and UI switches from anonymous mode to authenticated mode.
Actual: login flow does not complete and no auth state is set.
Relevant code: app.js handleGoogleLogin and config.js supabase config.
Environment values are set but secret values are masked.
Please suggest the most likely fix and tell me what to verify in Supabase Auth settings.
```

---

## 11. Safe Reference Guidelines

When sharing context with another AI or human collaborator:
- do not paste raw secret keys
- mask tokens and keys
- share only the filename and relevant code snippet
- include console errors exactly
- keep scope focused on one issue at a time

---

## 12. Useful Commands

Local preview:

```bash
cd src
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

---

## 13. Next Recommended Step

The next step is to connect the frontend to Supabase Auth and create the database tables with RLS.

After that, connect Cloudinary for uploads and then migrate playlist/favorite storage from browser localStorage to Supabase.

---

## 11. Supabase schema change rule

Any schema change related to Supabase must be reflected in the actual Supabase database by executing the SQL in the Supabase SQL Editor.

Rules:
- Editing only local files is not enough.
- The Supabase database is the source of truth for schema state.
- After schema updates, verify the table, column, trigger, policy, and RLS state in Supabase.
- If the owner or authorized user is required to run SQL, the work must be requested to the owner before deployment.
- The app must not assume that a local `supabase-schema.sql` change is already applied in production.

Required request wording:
- "Supabase のスキーマ変更は、ローカルファイルの更新だけでは完了しません。必ず Supabase の SQL Editor で SQL を実行して反映してください。反映確認も含めて、オーナー側で実行・検証をお願いします。"

This rule applies to all future development sessions and should be treated as project policy.

---
