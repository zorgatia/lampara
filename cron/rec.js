const cron = require("node-cron");
const https = require("https");

const Rec = require('../models/Rec')

module.exports = () =>
  cron.schedule("1 * * * *", async () => {

    await Rec.deleteMany();
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
            rest.forEach(async e => {
                const rec = new Rec(e);
                
                await rec.save();
                console.log(e)
            });


        });
      })
      .on("error", err => {
        console.log("Error: " + err.message);
      });
  });
