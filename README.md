## Getting Started

First, run:

```bash
npm install 
```

Secound, create a .env file in root with the following infromation
```bash
NEXT_PUBLIC_AEM_HOST=`Your AEM author or publisher host`
NEXT_PUBLIC_AEM_GRAPHQL_ENDPOINT= `Your AEM graphql endpoint`
NEXT_PUBLIC_URL=http://localhost:3000

AEM_AUTH_METHOD=dev-token
AEM_AUTH_DEV_TOKEN=`Your develpoer token from the developer console`
```

Third, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
