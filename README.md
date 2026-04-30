# Q&A Forum Application

Minimal NestJS Q&A forum backend using Prisma/Postgres and JWT auth.

## Requirements

- Node >= 18
- pnpm (or npm/yarn)
- PostgreSQL database

## Environment

Create a `.env` file with at least:

- `DATABASE_URL=postgresql://user:pass@host:5432/dbname`
- `JWT_SECRET=your_jwt_secret`

## Install

```bash
pnpm install
```

## Database

Run Prisma migrations:

```bash
npx prisma migrate deploy
```

Or for dev:

```bash
npx prisma migrate dev
```

## Run

```bash
pnpm run start:dev
```

## API (selected endpoints)

- `GET /threads` — list all threads (public)
- `GET /threads/:id` — get thread by id (public)
- `POST /threads` — create a thread (requires `Authorization: Bearer <token>`)
- `PATCH /threads/:id` — update a thread (requires auth; only thread creator allowed)
- `DELETE /threads/:id` — delete a thread (requires auth; only thread creator allowed)
- `GET /threads/my-threads/:id` — list threads for a user id (requires auth)

Notes:

- The JWT strategy returns `req.user.userId` from the token's `sub` claim.
- Currently `ThreadsRepository.create` will assign `userId` from the provided payload or default to `1` if none is provided.

## Tests

```bash
pnpm test
pnpm test:e2e
```

<img width="804" height="443" alt="Screenshot 2026-05-01 040739" src="https://github.com/user-attachments/assets/ff8960ab-62c0-48d8-af9b-ffce4009b3f5" />
<img width="797" height="470" alt="Screenshot 2026-05-01 040556" src="https://github.com/user-attachments/assets/8c792b94-54c8-4f45-8f44-4e2088853b64" />
<img width="794" height="467" alt="Screenshot 2026-05-01 040347" src="https://github.com/user-attachments/assets/e9208fb7-42b8-41ed-8d27-3b8d02dc1cfa" />
<img width="795" height="473" alt="Screenshot 2026-05-01 040241" src="https://github.com/user-attachments/assets/53fb5c3f-996d-4469-aec2-867d71094e27" />
<img width="788" height="464" alt="Screenshot 2026-05-01 040118" src="https://github.com/user-attachments/assets/474be19b-0c22-4b6a-b26f-9634d7584f0d" />
<img width="793" height="471" alt="Screenshot 2026-05-01 035955" src="https://github.com/user-attachments/assets/51d9ade0-9dc2-4325-8e44-f796f62c5b66" />
<img width="800" height="472" alt="Screenshot 2026-05-01 035914" src="https://github.com/user-attachments/assets/4e014d40-7dfa-4d5a-964a-4c762b35a16a" />

