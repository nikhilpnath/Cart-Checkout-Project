# Checkout  Project

- 📖 [Remix docs](https://remix.run/docs)

## Development

Add .env in root (prisma)

```shellscript
DATABASE_URL="mongodburl"
```
- you will have issues if your mongo_url has characters like @ $ / : , etc.
- it should be [percent-encoded (check here)](https://www.prisma.io/dataguide/mongodb/connection-uris#percent-encoding-values)

Run the prisma command
```shellscript
npx prisma generate
npx prisma db push
```

Run the graphql-server:(port 3000)

```shellscript
json-graphql-server graphql-server.json
```

Run the dev server:

```shellscript
npm run dev
```

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling
- This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. 
- This project is fully responsive 
