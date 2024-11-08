
// Script to retrieve and aggregate the results/jumps from all leaderboards.
// The output is a common jump format stored in a file called `aggregated.json`.

const request = require("request");

type Jump = {
    source: string,
    position: string,
    name: string,
    height: string,
    date: string,
    location?: string,
    gender?: string,
    country?: string,
    imageURL?: string,
};

type Jumps = Jump[];

const makeHTTPRequest = async (source: string, options) => {
    const resp = await new Promise<void>((resolve, reject) => {
        request.get(options, (err, res, body) => {
            if (err) {
                console.error(`Failed to GET ${source} response: ${err}`);
                return reject();
            }
            
            console.log(`${source} HTTP status: ${res.statusCode}`);
            return resolve(body);
        });
    });
    
    return resp;
};

const getSurfrResults = async () => {
    const options = {
        url: "https://kiter-271715.appspot.com/leaderboards/list/height/alltime/0?accesstoken=e16a0f15-67c5-4306-81a5-0c554a55a222",
        json: true
    };
  
    const body = await makeHTTPRequest("Surfr", options);
    console.log("Obtained Surfr results");
    
    return body;
};

const main = async () => {
    console.log("Running aggregate script...");
    
    const jumps: Jumps = [];
    const surfrBody = await getSurfrResults();
    
    console.log(surfrBody);
    
    console.log("Finished aggregate script");
}

main();
