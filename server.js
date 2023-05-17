const express = require('express');
const axios = require('axios');

const app = express();
const port = 5000;



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


async function sendWhatsAppMessage(to, message) {
    const callbackUrl = 'https://webhook.site/3b63369f-bd14-48c9-a667-19eab1e2282d'; 
    const maytapiApiKey = '01484f30-c397-486c-8231-02a3f068a888'; 
    const product_id = '54556686-6735-4a66-a51c-be676c46620a';
    const phone_id = '29054'
  try {
    const response = await axios.post(
      `https://api.maytapi.com/api/${product_id}/${phone_id}/sendMessage`,
      {
        phone_number: to,
        text: message,
      },
      {
        url: callbackUrl,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': maytapiApiKey,
        },
      }
    );
    console.log(`Message sent to ${to}`);
    return response.data;
  } catch (error) {
    console.error('Failed to send message:', error);
    throw error;
  }
}

function handleIncomingMessage(message) {
  const { from, body } = message;

  console.log(`Received message from ${from}: ${body}`);

  
  if (body.toLowerCase() === 'hi' || body.toLowerCase() === 'hello' || body.toLowerCase() === 'hey') {
    const response = `hi, welcome to Techon. How may we help you?
    1. Customer Support
    2. Sales`;
    sendWhatsAppMessage(from, response);

}

}
app.post('/29054/sendMessage', (req, res) => {
  const message = req.body; 
  handleIncomingMessage(message);

  res.sendStatus(200); 
});
