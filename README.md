# NexusOps Project Management Dashboard

A web-based project management dashboard with overview, task tracking, daily sub-tasks, calendar, reports, and sprint-related interface modules.

## Project structure

- `PM_Dashboard.html` — main dashboard page
- `css/` — dashboard stylesheets
- `js/` — frontend JavaScript files
- `backend/server.js` — Express server and report PDF endpoints
- `backend/report-template.html` — HTML template used to generate PDF reports
- `nexusops_schema.sql` — PostgreSQL database schema
- `nexusops_erd.html` — database entity relationship diagram page

## Requirements

- Node.js and npm
- A modern web browser
- PostgreSQL, if using the supplied database schema

## Run the backend

1. Open a terminal in the `backend` directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and enter your own email configuration if you need the email-report feature.
4. Start the server:

   ```bash
   npm start
   ```

The backend listens on port `5005`.

## Security note

Do not commit `.env` files, passwords, app passwords, or other secrets. Email sending requires `EMAIL_USER`, `EMAIL_APP_PASSWORD`, and `REPORT_RECIPIENT` environment variables configured locally.
