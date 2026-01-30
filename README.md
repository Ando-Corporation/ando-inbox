# Ando Inbox Prototypes

Interactive prototype viewer for Ando's inbox notification states. Shows all 33 valid state combinations based on the inbox notification matrix spec.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the prototypes.

## State Matrix

The inbox system has **33 prototype states** across three location types:

| Location | States |
|----------|--------|
| 1:1 DM | 6 |
| Multi-DM | 18 |
| Channel | 9 |

### State Dimensions

- **Location**: 1:1 DM, Multi-DM, Channel
- **Notification Type**: message, @mention, thread-reply
- **Read State**: unread, read
- **Count**: 1 (dot), 2+ (badge), none (read)
- **Time Display**: <1hr, <24hr, <7d, >7d

### Validation Rules

- `1:1 DM` cannot have `@mention` notifications
- `read` state shows no count badge
- `Multi-DM` shows 2-avatar or 3+-stack participant display
- `Channel` shows channel icon with last sender name

## Features

- Filter by location, notification type, and read state
- Toggle time display format
- Hover over items to see state details
- Reference table showing all 33 states

## Tech Stack

- React + TypeScript
- Tailwind CSS
- Vite

## Build

```bash
npm run build
```

Output goes to `dist/` folder.
