const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const express = require('express');
const axios = require('axios');
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const CLIENT_ID = "1031879882287-qr0138tc1iidp21h6c362njfq2ks8069.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const CALLBACK_URL = "http://localhost:3000/auth/google/callback";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  CALLBACK_URL
);

//This method returns a url where the users can see the oAuth consent screen
function getGoogleAuthURL() {
    const scope = [
        'https://www.googleapis.com/auth/forms.responses.readonly'
    ];
  
    return oauth2Client.generateAuthUrl({
      //'offline' mode will return a refresh token which we can save in our database to access the user's data in the future
      access_type: 'offline', 
      scope,
    });
}

// ===============================
let formId_input;
app.get('/auth/google', (req, res) => {
    formId_input = req.query.formId;
    res.redirect(getGoogleAuthURL());
});

// ===============================
  async function getGoogleUser({ code }) {
    // This will return an object with the access_token and refresh_token
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials({
      refresh_token: tokens.refresh_token
    });
  
    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokens.id_token}`,
          },
        },
      )
      .then(res => {
        return { data: res.data, refresh_token: tokens.refresh_token };
      })
      .catch(error => {
        throw new Error(error.message);
      });
      return googleUser;
  }
  
// ========================= CALLBACK ROUTE
app.get('/auth/google/callback', async (req, res) => {
    try {
        const googleUser = await getGoogleUser(req.query);

        //Get user id, email and name from the response
        const { id, email, name } = googleUser.data;

    //You can store this refresh token in your db for future access
    const refreshToken = googleUser.refresh_token;

    //Store the data in DB and redirect to some other page
    // ...code for DB...

    // redirect to 
    res.redirect('/get-forms-data');


    } catch(err) {
    //Error handling logic here
    }
})

// ========================
app.get('/get-forms-data', async (req, res) => {
    try {
      // Authenticate and get access token
      const auth = await authenticate({
        keyfilePath: path.join(__dirname, 'credentials.json'),
        scopes: 'https://www.googleapis.com/auth/forms.body.readonly',
      });
      const forms = google.forms({
        version: 'v1',
        auth: auth,
      });
  
      // Replace 'formID' with the actual form ID
      const formID = formId_input;
      
      // Fetch Google Forms data
      const response = await forms.forms.get({ formId: formID });
      const formData = response.data;
  
      res.json({ formData });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


// =================
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
