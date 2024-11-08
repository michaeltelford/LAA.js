
// Script to retrieve and aggregate the results/jumps from all leaderboards.
// The output is a common jump format stored in a file called `aggregated.json`.

import request from "request";
import * as fs from "fs";
import { Source, Jump, SurfrJump, WooJump } from './types/types';

const outputFilePath = "./public/aggregated_results.json";

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

const buildHTTPPromise = async (source: Source) => {
  const options = {
    url: source.url,
    json: true,
  };

  console.log(`Requesting results from ${source.name}...`);

  return await makeHTTPRequest(source.name, options);
};

const pullSources = async (): Promise<any[]> => {
  const promises = sources.map(source => buildHTTPPromise(source));
  return await Promise.all(promises);
};

const mapJumps = (surfrJumps: SurfrJump[], wooJumps: WooJump[]): Jump[] => {
  const jumps: Jump[] = [];

  surfrJumps.forEach(jump => {
    jumps.push({
      source: "Surfr",
      name: jump.user.name,
      height: jump.value,
      country: jump.user.countryIOC,
    } as Jump);
  });

  wooJumps.forEach(jump => {
    const imageURL = jump._pictures.filter(picture => picture.type === "user")[0]?.url;

    jumps.push({
      source: "Woo",
      name: `${jump.name} ${jump.lastname}`,
      height: jump.score,
      imageURL,
    } as Jump);
  });

  // Sorted desc i.e. highest jump first aka jumps[0]
  jumps.sort((a, b) => b.height - a.height);

  console.log(`Successfully mapped and sorted ${jumps.length} jump results`);

  return jumps;
}

const writeJumpsToFile = (jumps: Jump[]) => {
  fs.writeFileSync(outputFilePath, JSON.stringify(jumps, null, 2), "utf8");

  console.log(`Results written to file: ${outputFilePath}`);
}

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
  const jumps = mapJumps(surfrResults, wooResults);

  writeJumpsToFile(jumps);

  console.log(jumps.map(j => [j.source, j.name, j.height]));
  console.log("Finished aggregate script");
}

main();
