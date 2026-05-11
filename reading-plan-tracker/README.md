# Reading Plan Tracker

A focused, card-based reading queue. Pulls articles from a JSON feed (e.g.
your article-summarizing skill) and helps you work through them one at a time.

## Features

- One article in focus at a time — Read / Skip / Save for later
- Filter by publication (WSJ, Economist, New Yorker, Athletic) and topic
- Progress tracking, persisted to localStorage
- JSON import for new articles
- Keyboard shortcuts: `R` read, `S` skip, `L` save for later

## Run locally

```bash
cd reading-plan-tracker
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Importing articles

Click **Import Articles** in the sidebar and paste JSON of the form:

```json
{
  "articles": [
    {
      "id": "unique-id",
      "title": "...",
      "publication": "wsj",
      "topic": "Economy",
      "summary": "...",
      "url": "https://...",
      "date": "2026-05-11",
      "priority": 1,
      "status": "unread"
    }
  ]
}
```

A plain array is also accepted. Valid `publication` values: `wsj`,
`economist`, `new-yorker`, `athletic`.
