# Portfolio — Keith

Live demo: add your Vercel URL here after deploy.

Quick start

1. Install dependencies

```bash
npm ci
```

2. Run dev

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

Automatic Vercel deployments (GitHub Actions)

This repository includes a GitHub Actions workflow at [.github/workflows/vercel-deploy.yml](.github/workflows/vercel-deploy.yml) that builds and deploys the site to Vercel on pushes to the `main` branch.

To enable automatic deploys, add the following repository secrets in GitHub Settings → Secrets → Actions:

- `VERCEL_TOKEN` — a personal token from Vercel (User Settings → Tokens)
- `VERCEL_ORG_ID` — your Vercel organization ID
- `VERCEL_PROJECT_ID` — your Vercel project ID

After adding those secrets, pushes to `main` will automatically build and deploy to Vercel.

License

This project is licensed under the MIT License — see the `LICENSE` file.
