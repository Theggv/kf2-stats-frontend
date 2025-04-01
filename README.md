# Better Stats Frontend

Frontend part of Better Stats for Killing Floor 2.

## Non-docker setup

### Production build

- Create `.env.production` based on `.env.example`

```
npm run build
npm run start
```

### Development build

- Create `.env.development` based on `.env.example`

```
npm run dev
```

## Docker setup

1. Create `.env.production` based on `.env.example`
2. Set `PUBLIC_BACKEND_URL` to `http://backend:3000/api`
3. Set `HOST` to `0.0.0.0`
4. Build using docker compose

```
docker compose up -d --build
```

5. If changes were made run:

```
docker compose down
docker compose up -d --build
```
