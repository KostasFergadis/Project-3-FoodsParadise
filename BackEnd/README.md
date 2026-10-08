# Project_3 Backend

Express + MongoDB API for Foods Paradise.

## Setup

1. `npm install`
2. `cp .env.example .env` and fill in the values (see below).
3. `npm run seed-db` loads the foods and two demo accounts (optional, **wipes the database**).
4. `npm start` runs the server on `PORT` (default 2002).

## Environment variables

| Variable | Purpose |
|---|---|
| `DB_CONNECTION_STRING` | MongoDB URL. Required in production. |
| `JWT_SECRET` | Secret used to sign login tokens. Required in production; use a long random value. |
| `PORT` | Port to listen on (default 2002). |
| `CORS_ORIGIN` | Comma-separated front-end origins allowed to call the API. Empty allows any origin. |
| `SEED_ADMIN_PASSWORD`, `SEED_USER_PASSWORD` | Passwords for the demo accounts created by `seed-db`. |
| `ALLOW_REMOTE_SEED` | Set to `true` to let `seed-db` wipe a non-local database. |

`.env` is git-ignored. Never commit it.

## Security notes

- Passwords are hashed with bcrypt and never returned by the API.
- Login tokens expire after 7 days.
- `helmet` sets secure headers; requests are rate limited (stricter on `/login` and `/register`).
- Email addresses are unique and matched case-insensitively. If the unique index fails to build on an existing database, look for duplicate emails.
- Only admins can create, update or delete foods and list all users.
- If you deploy behind a proxy (for example Render), add `app.set("trust proxy", 1)` in `server.js` so rate limiting sees real client IPs.
