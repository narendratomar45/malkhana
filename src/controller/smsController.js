const twilio = require("twilio");

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
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
