const cron = require("node-cron");
const https = require("https");

module.exports = () =>
  cron.schedule("0 * * * *", () => {
    console.log("running a task ");
    https
      .get("https://recodc.herokuapp.com", resp => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on("end", () => {
          const rest =JSON.parse(data)
            rest.array.forEach(e => {
                
            });


        });
      })
      .on("error", err => {
        console.log("Error: " + err.message);
      });
  });
