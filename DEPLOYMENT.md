# KTL Website Deployment

## Admin dashboard

- Login URL: `/admin/login`
- Dashboard URL: `/admin`
- Required environment variables:
  - `DATABASE_URL`
  - `ADMIN_PASSWORD`
  - `ADMIN_SECRET`

Use a long random value for `ADMIN_SECRET`.

## MySQL database

Vercel hosts the Next.js app, but it does not provide a native MySQL server for this project. Use a hosted MySQL-compatible database provider, then paste its connection string into Vercel as `DATABASE_URL`.

Recommended connection string shape:

```txt
mysql://USER:PASSWORD@HOST:3306/ktl_website
```

After the database exists, run:

```bash
npx prisma migrate deploy
```

On Vercel, add this as the build command if you want migrations to run during deploy:

```bash
npx prisma migrate deploy && next build
```

## Vercel deployment

1. Push this repository to GitHub.
2. Open Vercel and choose **Add New Project**.
3. Import the GitHub repository.
4. Add the environment variables:
   - `DATABASE_URL`
   - `ADMIN_PASSWORD`
   - `ADMIN_SECRET`
5. Set the build command:
   - `npx prisma migrate deploy && next build`
6. Deploy.

## Local development

Create a local `.env` with:

```txt
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/ktl_website"
ADMIN_PASSWORD="your-local-password"
ADMIN_SECRET="your-local-random-secret"
```

Then run:

```bash
npm install
npx prisma migrate deploy
npm run dev
```
