
# Leaderboard Aggregate App (LAA)

The Leaderboard Aggregate App (LAA) enabled users to see the combined height records of kitesurfing big air jumps from a variety of leaderboards e.g. Surfr, Woo etc.

## Sources

### Surfr

#### Leaderboard

https://surfr-leaderboard.vercel.app/

#### API

https://kiter-271715.appspot.com/leaderboards/list/height/alltime/0?accesstoken=e16a0f15-67c5-4306-81a5-0c554a55a222

### Woo

#### Leaderboard

https://leaderboards.woosports.com/kite/bigair?mt=height&sd=1357002000&ed=1713830400&co=&cy=&sp=&ge=&ht=null

Note: Params above ^^ are for kiting big air all time jumps.

Note: The woo leaderboard app is pretty flakey on some browsers.

#### API

https://prod3.apiwoo.com/leaderboardsHashtags?offset=0&page_size=50&feature=height&game_type=big_air

## Design

Designed as a React app with some vanilla JS to aggregate the results.

```text
setInterval -> aggregate.ts -------> aggregated_results.json
                                                 ^
user (browser) -> react_app -------<state>-------|
```

## Development

### Phase 1

Retrieve and aggregate the results from all leaderboards.

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

A results enumerable will contain all results to be displayed, sorted by jump height.

#### Pseudo Code

> aggregate.ts

```
aggregate_results() -> aggregated_results.json
```

- Create an instance of common Results (enumerable)
- For each leaderboard URL:
    - GET <API_URL> JSON response containing all results
    - For each result object:
        - Transform to a common Result object
        - Append result to common Results enumerable
- Sort results by height (highest jump first)
- Write the results to `aggregated_results.json` file at root of repo

### Phase 2

Create a react app to display the aggregated results.

- Read results from `aggregated_results.json`
- Set in state (re-rendering the React components)
- User can now see and interact with the aggregated Results
- Results will be updated every 24 hours

> app.ts

```js
// When app starts, after a new release or error etc.
// The sources will be polled and their results aggregated into a JSON file
// which is consumed by the React app, displaying the information to the user.
// These results will be updated every 24 hours thereafter (requiring a page refresh?).

import aggregate_results from 'aggregate' // aggregate.ts

aggregateResults()
setInterval(aggregateResults(), 24 * hours)

initialState = readAggregatedResults('aggregated_results.json')

// ... normal react startup code
```

When the app is loaded in the browser, the `aggregated_results.json` file will be updated every 24 hours, requiring a page/app refresh to update state and UI.

If a page refresh is undesirable, we can use our existing`setInterval` to also refresh the state automatically:

```js
refreshResults = () => {
    // dispatch('AGGREGATED_RESULTS')
    //    --> results = readAggregatedResults('aggregated_results.json')
    //    --> setState(results)
})

// Updating the setInterval method from above.
setInterval(() => {
    aggregateResults()
    refreshResults()
}, 24 * hours)
```
