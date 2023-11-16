const path = require('path');
const google = require('@googleapis/forms');
const {authenticate} = require('@google-cloud/local-auth');
const express = require('express');
const fs = require('fs');
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

async function runSample(formID) {
    const auth = await authenticate({
      keyfilePath: path.join(__dirname, 'credentials.json'),
      scopes: 'https://www.googleapis.com/auth/forms.body.readonly',
    });
    const forms = google.forms({
      version: 'v1',
      auth: auth,
    });
    const res = await forms.forms.get({formId: formID});
    return res.data;
  }

// ===============================
app.get('/getForm', (req, res) => {
    async function getFormData(formID){
        formData = await runSample(formID);
        console.log(formData);
        fs.writeFile("formData.json", JSON.stringify(formData), err => {
            if(err) return console.log(err);
            console.log("The file was saved!");
        }); 
    }
    
    getFormData(req.query.formId);

    res.status(200).send("DONE");
});

// =================
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





