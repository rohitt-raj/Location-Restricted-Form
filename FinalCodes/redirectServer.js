const fs = require('fs').promises;
const path = require('path');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const express = require('express');
const app = express();
const url = require('url');

const cors = require("cors");
app.use(cors());
app.use(express.json());

const CLIENT_ID = "1031879882287-k01mdfgjtjttmpdlluurjar4au91rsk0.apps.googleusercontent.com"; 
const CLIENT_SECRET = "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";
const CALLBACK_URL = "http://localhost:3005/auth/google/callback";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  CALLBACK_URL
);

const formId_input = "1FAIpQLScRH1JbbEOuBl5Pb5-vPMwOJgs7enUoClHR78D96S5x6ebleA"; // to be sent by mainServer.js // written direclt here for testing // will be modified later

app.get('/auth/google/callback', async (req, res) => {
    let q = url.parse(req.url, true).query;

    // Get access and refresh tokens
    let { tokens } = await oauth2Client.getToken(q.code);
    oauth2Client.setCredentials(tokens);
    let savedToken = tokens;
  
    try {
      // get access token
      const auth = await authenticate({
        keyfilePath: path.join(__dirname, 'credentials.json'),
        scopes: 'https://www.googleapis.com/auth/forms.body.readonly',
      });
      const forms = google.forms({
        version: 'v1',
        auth: auth,
      });

      const formID = formId_input;
      
      // Fetch Google Forms data
      const response = await forms.forms.get({ formId: formID });
      const formData = response.data;
      console.log(formData);
      res.json({ formData });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

// =======================
const port = 3005;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
