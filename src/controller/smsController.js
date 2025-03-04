// const twilio = require("twilio");

// const accountSid = "AC2d24b74eeeee9bf405b9b092c65c621b";
// const authToken = "2933af6766b98c31e68f4f411954c4b5";
// const client = new twilio(accountSid, authToken);

// const sendSMS = async (req, res) => {
//   try {
//     const { to, message } = req.body;

//     client.messages
//       .create({
//         body: message,
//         to: to,
//         from: "+14243810662",
//       })
//       .then((message) => {
//         res.status(200).send({ success: true, messageSid: message.sid });
//       })
//       .catch((error) => {
//         res.status(500).send({ success: false, error: error.message });
//       });
//   } catch (error) {
//     res.status(500).send({ success: false, error: error.message });
//   }
// };
// module.exports = sendSMS;

const twilio = require("twilio");

const accountSid = "AC2d24b74eeeee9bf405b9b092c65c621b";
const authToken = "2933af6766b98c31e68f4f411954c4b5";
const client = new twilio(accountSid, authToken);

const sendSMS = async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res
        .status(400)
        .json({ success: false, error: "Missing 'to' or 'message' field." });
    }

    const sms = await client.messages.create({
      body: message,
      to: to, 
      from: "+14243810662", 
    });

    res.status(200).json({ success: true, messageSid: sms.sid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = sendSMS;
