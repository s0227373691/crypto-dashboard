This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, setup an environment variable:

```.env
NEXT_PUBLIC_CRYPTO_COM_SOCKET_URL="wss://stream.crypto.com/exchange/v1/market"
```

Second, run the development server:

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

### Available route
- [http://localhost:3000/](http://localhost:3000/)
- [http://localhost:3000/best-five-orders](http://localhost:3000/best-five-orders)
