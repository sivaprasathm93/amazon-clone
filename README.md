# A2ZMandi


A full-stack e-commerce web app: React/TypeScript storefront on the frontend, an Express/MongoDB REST API on the backend, with JWT authentication and an order pipeline.

Live demo: https://amazon-clone-test.netlify.app/

> Originally built as a learning project modeled on Amazon's UI; the backend has since been extended with a real products API, order persistence, and route-level auth so it exercises the full stack end to end.

## Architecture

```
React + TypeScript (Vite)  --->  Express REST API  --->  MongoDB (Mongoose)
        |                              |
   React Router, fetch            JWT auth middleware
```

- **Frontend**: React 19, TypeScript 5.9, Vite 8, React Router 7, Tailwind CSS 4, SCSS, Swiper 14, Lucide + React Icons.
- **Backend**: Node.js, Express 5, TypeScript 5.9, Mongoose 9/MongoDB, JWT-based auth, bcrypt password hashing.
- **Testing**: Jest 30 + Supertest against an in-memory MongoDB instance (no real database needed to run tests).

Tailwind is on v4, which is configured in CSS rather than JavaScript — there is no
`tailwind.config.js`; the theme lives behind `@import "tailwindcss"` in `src/index.css`.

### Backend layout

```
server/src
├── models/       User, Product, Order schemas
├── routes/       auth, products, orders
├── middleware/   requireAuth (JWT bearer-token guard)
├── __tests__/    Jest suites + in-memory Mongo setup
├── seed.ts       sample product seeder
└── server.ts     app wiring; only listens when run directly
```

## Features

- Product listing, product detail pages, trending/upcoming sections
- Cart and checkout flow (Stripe.js on the frontend)
- User signup/login with hashed passwords and JWT sessions
- **Products API** — products served from MongoDB rather than a static local file
- **Orders API** — authenticated users can place orders; totals are computed server-side from live product prices, never trusted from the client
- Route-level authorization middleware (`requireAuth`) protecting the orders endpoints
- Responsive layout

## API

| Method | Route           | Auth required | Description                         |
|--------|-----------------|:-------------:|-------------------------------------|
| POST   | `/signup`       | No            | Create an account                   |
| POST   | `/login`        | No            | Log in, returns a JWT               |
| GET    | `/products`     | No            | List all products                   |
| GET    | `/products/:id` | No            | Get a single product                |
| POST   | `/orders`       | Yes           | Place an order for the current user |
| GET    | `/orders`       | Yes           | List the current user's orders      |
| GET    | `/health`       | No            | Health check                        |

Protected routes expect an `Authorization: Bearer <token>` header.

## Getting Started

### 1. Clone and install

```sh
git clone https://github.com/sivaprasathm93/amazon-clone.git
cd amazon-clone
yarn install
cd server && yarn install && cd ..
```

### 2. Configure the backend

```sh
cp server/.env.example server/.env
```

Then edit `server/.env` with your own MongoDB connection string and a JWT secret:

```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
JWT_SECRET=<a-long-random-string>
PORT=5000
```

`server/.env` is git-ignored and should never be committed.

### 3. Seed sample product data (optional)

```sh
cd server
yarn seed
```

### 4. Run it

```sh
# terminal 1 - backend
cd server
yarn server

# terminal 2 - frontend
yarn dev
```

The frontend runs at `http://localhost:5173` and talks to the API at `http://localhost:5000`.

### 5. Run backend tests

```sh
cd server
yarn test
```

This repo's lockfile is `yarn.lock`, so use yarn rather than npm — npm rewrites
`yarn.lock` on install and the two lockfiles drift apart.

Tests spin up an isolated in-memory MongoDB instance automatically — no real database or credentials required.
## License

MIT
