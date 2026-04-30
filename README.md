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

## Next recommended improvements

- Use the authenticated user id automatically for `create` instead of defaulting to `1`.
- Replace `my-threads/:id` to read the user id from the JWT (remove URL param).
- Add unit/e2e tests for ownership checks on update/delete.

---

Created and edited by local developer tools.

