const path = require("path");
const google = require("@googleapis/forms");
const { authenticate } = require("@google-cloud/local-auth");
const express = require("express");
const fs = require("fs");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

async function fetchData(formID) {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "credentials.json"),
    scopes: "https://www.googleapis.com/auth/forms.body.readonly",
  });
  const forms = google.forms({
    version: "v1",
    auth: auth,
  });
  const res = await forms.forms.get({ formId: formID });
  return res.data;
}

// ===============================
app.get("/getForm", (req, res) => {
    async function getFormData(formID) {
        formData = await fetchData(formID);
        fs.writeFile("for-student/formData.json", JSON.stringify(formData), (err) => {
            if (err) return console.log(err);
            console.log("The file was saved!");
            // res.status(200).json({
            //     url: "10.7.11.14:5501/for-student/homepage.html",
            // });
        });
    }

    getFormData(req.query.formId);
});

// ============================= REDIRECT URI
// app.get('/auth/google/callback', (req, res) => {
//     res.json({
//         url: "10.7.11.14:5501/for-student/homepage.html",
//     });
// });

// =================
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
