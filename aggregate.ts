
// Script to retrieve and aggregate the results/jumps from all leaderboards.
// The output is a common jump format stored in a file called `aggregated.json`.

import request from "request";
import { Jumps, Jump } from './types/types';

const makeHTTPRequest = async (source: string, options) => {
  return await new Promise<void>((resolve, reject) => {
    request.get(options, (err, res, body) => {
      if (err) {
        console.error(`Failed to GET ${source} response: ${err}`);
        return reject(err);
      }
      
      console.log(`${source} HTTP status: ${res.statusCode}`);
      return resolve(body);
    });
  });
};

const getSurfrResults = async () => {
  const options = {
    url: "https://kiter-271715.appspot.com/leaderboards/list/height/alltime/0?accesstoken=e16a0f15-67c5-4306-81a5-0c554a55a222",
    json: true
  };
  
  console.log("Requesting results from Surfr...");

  return await makeHTTPRequest("Surfr", options);
};

const getWooResults = async () => {
  const options = {
    url: "https://prod3.apiwoo.com/leaderboardsHashtags?offset=0&page_size=50&feature=height&game_type=big_air",
    json: true
  };
  
  console.log("Requesting results from Woo...");

  return await makeHTTPRequest("Woo", options);
};

const pullSources = async () => {
  const jumps: Jumps = [];
  
  await Promise.all([getSurfrResults(), getWooResults()]).then(values => {
    const [surfrBody, wooBody] = values;
    console.log("Pulled sources");
  });
  
  return jumps;
};

const main = async () => {
  console.log("Running aggregate script...");
  
  const jumps = await pullSources();
  
  console.log("Finished aggregate script");
}

main();
