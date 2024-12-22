This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
This is my project of groceries store: my branch: https://github.com/yaelx/store-app.git

## Getting Started

First, 
you need to install: json-server so we can mock server running.
and then run: 
```npx json-server --watch public/food_products.json --port 5001```

run the development server for the fontend React app:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## TO DO:
- add real food products urls for DB
- replace mock json with real database on firestore of mongoDB !
- styling the app
- add roting with views and cart handling
- add menu links