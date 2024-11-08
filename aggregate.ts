
// Script to retrieve and aggregate the results/jumps from all leaderboards.
// The output is a common jump format stored in a file called `aggregated.json`.

import request from "request";
import { Source, Jump, SurfrJump, WooJump } from './types/types';

const sources: Source[] = [
  {
    name: "Surfr",
    url: "https://kiter-271715.appspot.com/leaderboards/list/height/alltime/0?accesstoken=e16a0f15-67c5-4306-81a5-0c554a55a222",
  },
  {
    name: "Woo",
    url: "https://prod3.apiwoo.com/leaderboardsHashtags?offset=0&page_size=50&feature=height&game_type=big_air",
  },
];

const buildHTTPPromise = async (source: Source) => {
  const options = {
    url: source.url,
    json: true,
  };

  console.log(`Requesting results from ${source.name}...`);

  return await makeHTTPRequest(source.name, options);
};

const makeHTTPRequest = async (source: string, options) => {
  return await new Promise<void>((resolve, reject) => {
    request.get(options, (err, res, body) => {
      if (err) {
        console.error(`Failed to GET response (${source}): ${err}`);
        return reject(err);
      }
      
      console.log(`HTTP status: ${res.statusCode} (${source})`);
      return resolve(body);
    });
  });
};

const pullSources = async (): Promise<any[]> => {
  const promises = sources.map(source => buildHTTPPromise(source));
  return await Promise.all(promises);
};

const main = async () => {
  console.log("Running aggregate script...");
  
  let surfrBody, wooBody;
  try {
    [surfrBody, wooBody] = await pullSources();
    console.log("Pulled sources");
  } catch(err) {
    console.error(`Error occurred pulling sources: ${err}`);
    return;
  }
  
  const surfrResults: SurfrJump[] = surfrBody;
  const wooResults: WooJump[] = wooBody["items"];

  console.log(true);

  console.log("Finished aggregate script");
}

main();
