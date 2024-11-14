
# Leaderboard Aggregate App (LAA)

The Leaderboard Aggregate App (LAA) enabled users to see the combined height records of kiteboarding big air jumps from a variety of leaderboards e.g. Surfr, Woo etc.

## Sources

- Surfr
- Woo

## Design

Designed as a React app that reads the aggregated results as a JSON file from an API.

```text
api -----------------------> aggregated_results.json
                                           ^
user (browser) -> react_app ----<state>----|
```

## Development

Fetch the results and display them to the user.

#### Common Format

Each jump result should contain the following fields (if possible):

- Position (in leaderboard)
- Name (of the rider)
- Height (of the jump)
- Location (of the jump)
- Date (of the jump)
- Gender (of the rider)
- Country (of the rider)
- ImageURL (of the rider)
- Source (Surfr etc)

A JSON file (fetched from an API) will contain all results to be displayed, sorted by jump height.

- Results live here: `https://<api>/aggregated_results.json`
- `componentDidMount` fetches ^ and sets in state (updating the UI)
- User can now see and interact with the aggregated Results
- Results will be updated by the API every 24 hours

## Usage

Set the necessary ENV vars:

> .env.development.local

```
NODE_ENV=development
REACT_APP_API_URL=http://127.0.0.1:9292/aggregated_results.json
```

Make sure the API server is running and the above URL is producing JSON.

Then run the following commands:

```bash
npm i
npm start
```

Open `http://127.0.0.1:3000/` in a browser to view the app.

NOTE: Using `localhost` will cause CORS errors, so always use `127.0.0.1` instead.
