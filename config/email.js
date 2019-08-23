const nodeMailer = require("nodemailer");

let transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "smart.buoy.odc@gmail.com",
    pass: "OrangeB3"
  }
});

module.exports = (to, subject, text) => {
  let mailOptions = {
    from: '"Smart Buoy" <smart.buoy.odc@gmail.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text // plain text body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
    res.json("index");
  });
};
