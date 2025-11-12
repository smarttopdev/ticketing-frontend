# Ticketing Frontend

An Angular 19 single-page application for browsing events and booking tickets. The UI is built with Angular Material and communicates with a backend API through the `/api` proxy defined in `src/proxy.conf.json`.

## Features

- Event catalogue with availability indicators
- Booking dialog that posts reservations to the API
- Material Design components with responsive table layout
- Snack-bar notifications for success and error states

## Getting Started

### Prerequisites

- Node.js 18+ (Angular CLI 19 works best with Node 20; Node 18 is supported with warnings)
- npm 10+ (bundled with recent Node releases)

Install dependencies:

```bash
npm install
```

### Development Server

Start the Vite-powered dev server (binds to all interfaces and proxies API calls to `http://127.0.0.1:8080`):

```bash
npm start
```

Open the app at `http://localhost:4200/`. When running on another device in your LAN, use one of the network URLs that Angular prints to the terminal.

Ensure the backend service is available on port `8080`; otherwise the UI will display proxy errors when loading events or booking tickets.

### Building for Production

```bash
npm run build
```

The optimized output is emitted to `dist/ticketing-frontend/`.

### Running Tests

```bash
npm test
```

Executes Karma + Jasmine unit tests in watch mode.

## Project Structure

```
src/
  app/
    app.component.ts        # Root standalone component wiring the event list
    app.config.ts           # Angular providers (router, animations, HttpClient)
    components/
      event-list/           # Event table and booking trigger
      book-dialog/          # Ticket booking dialog
    services/
      event.service.ts      # HTTP client for event endpoints
    models/
      event.model.ts        # Event interface
  proxy.conf.json           # Local dev API proxy
```

Feel free to extend the component set or adjust the proxy configuration to match your backend endpoints.
