// contacted by getId.html

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
const CALLBACK_URL = "http://localhost:3005/auth/google/callback"; // redirect URI

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  CALLBACK_URL
);

//This method returns a url on which user can see the oAuth consent screen
function getGoogleAuthURL() {  
    const scope = [
        'https://www.googleapis.com/auth/forms.responses.readonly'
    ];
    return oauth2Client.generateAuthUrl({
      //'offline' mode will return a refresh token which we can save in our database to access the user's data in the future
      access_type: 'offline', 
      scope,
      include_granted_scopes: true
    });
}


// ===============================
let formId_input;
app.get('/auth/google', (req, res) => {
    formId_input = req.query.formId;
    const authUrl = getGoogleAuthURL();
    res.status(200).json({ url: authUrl });
    
    // res.redirect(getGoogleAuthURL());
    // res.writeHead(301, { "Location": getGoogleAuthURL() });
});

// =================
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// The below callback logic is currently handles by redirectServer.js
// ============================== CALLBACK ROUTE
// app.get('/auth/google/callback', async (req, res) => {
//   // Handle the OAuth 2.0 server response
//   let q = url.parse(req.url, true).query;

//   // Get access and refresh tokens
//   let { tokens } = await oauth2Client.getToken(q.code);
//   oauth2Client.setCredentials(tokens);
//   let savedToken = tokens;

//   try {
//     // get access token
//     const auth = await authenticate({
//       keyfilePath: path.join(__dirname, 'credentials.json'),
//       scopes: 'https://www.googleapis.com/auth/forms.body.readonly',
//     });
//     const forms = google.forms({
//       version: 'v1',
//       auth: auth,
//     });

//     const formID = formId_input; // formId received from Prof's end
    
//     // Fetch Google Forms data
//     const response = await forms.forms.get({ formId: formID });
//     const formData = response.data;
//     console.log(formData);
//     res.json({ formData }); // obtained forms data
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// })
