# Narula Business Centre — Full-Stack Demo

A premium animated React/Vite frontend plus a Node/Express/SQLite enquiry backend.

## Run locally

1. Install Node.js.
2. Open this project folder in VS Code or Command Prompt.
3. Run:

```bash
npm install
npm run dev
```

4. Open the Vite URL shown in the terminal, normally:
   `http://localhost:5173`

The API runs on:
`http://localhost:5000`

Admin dashboard:
`http://localhost:5173/admin.html`

## Notes

- The enquiry form stores submissions in `server/enquiries.db`.
- If the backend is unavailable, the frontend falls back to opening WhatsApp with the enquiry details.
- The admin page is a demo dashboard and is NOT protected by authentication yet. Before using it for real customer data, add authentication and deploy the database on a persistent backend service.
- Business details used in the demo are limited to information supplied for the project. Confirm all services, pricing, hours and photos with the business before launch.

## Suggested production deployment

For a real client launch, deploy the frontend and backend separately, use a hosted database, add admin authentication, and configure environment variables for the API URL.
