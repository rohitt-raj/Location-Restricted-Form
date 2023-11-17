// fetch('./example.json').then(response => response.json).then(data =>
//     {
//         console.log(data);
//     }
//     )
//     .catch(error =>console.error('Error fetching JSON', error));

// JSON structure representing the quiz
// Replace this placeholder object with your actual JSON data


// const quizData = {
//     "formId": "FORM_ID",
//     "info": {
//       "title": "Famous Black Women",
//       "description": "Please complete this quiz based off of this week's readings for class.",
//       "documentTitle": "API Example Quiz"
//     },
//     "settings": {
//       "quizSettings": {
//         "isQuiz": true
//       }
//     },
//     "revisionId": "00000021",
//     "responderUri": "https://docs.google.com/forms/d/e/1FAIpQLSd0iBLPh4suZoGW938EU1WIxzObQv_jXto0nT2U8HH2KsI5dg/viewform",
//     "items": [
//       {
//         "itemId": "5d9f9786",
//         "imageItem": {
//           "image": {
//             "contentUri": "DIRECT_URL",
//             "properties": {
//               "alignment": "LEFT"
//             }
//           }
//         }
//       },
//       {
//         "itemId": "72b30353",
//         "title": "Which African American woman authored \"I Know Why the Caged Bird Sings\"?",
//         "questionItem": {
//           "question": {
//             "questionId": "25405d4e",
//             "required": true,
//             "grading": {
//               "pointValue": 2,
//               "correctAnswers": {
//                 "answers": [
//                   {
//                     "value": "Maya Angelou"
//                   }
//                 ]
//               }
//             },
//             "choiceQuestion": {
//               "type": "RADIO",
//               "options": [
//                 {
//                   "value": "Maya Angelou"
//                 },
//                 {
//                   "value": "bell hooks"
//                 },
//                 {
//                   "value": "Alice Walker"
//                 },
//                 {
//                   "value": "Roxane Gay"
//                 }
//               ]
//             }
//           }
//         }
//       },
//       {
//         "itemId": "0a4859c8",
//         "title": "Who was the first Dominican-American woman elected to state office?",
//         "questionItem": {
//           "question": {
//             "questionId": "37fff47a",
//             "grading": {
//               "pointValue": 2,
//               "correctAnswers": {
//                 "answers": [
//                   {
//                     "value": "Grace Diaz"
//                   }
//                 ]
//               }
//             },
//             "choiceQuestion": {
//               "type": "RADIO",
//               "options": [
//                 {
//                   "value": "Rosa Clemente"
//                 },
//                 {
//                   "value": "Grace Diaz"
//                 },
//                 {
//                   "value": "Juana Matias"
//                 },
//                 {
//                   "value": "Sabrina Matos"
//                 }
//               ]
//             }
//           }
//         }
//       }
//     ]
//   };

// Define the variable to hold the quiz data
// let quizData = {}; // Initialize as empty object

// // Function to fetch custom JSON data
// function loadCustomJSON() {
//   fetch('./example.json')
//     .then(response => response.json())
//     .then(data => {
//       // Assign the fetched JSON data to the quizData variable
//       quizData = data;
//       console.log(quizData); // Display the data for demonstration
//       generateQuizForm();
//     })
//     .catch(error => console.error('Error fetching JSON:', error));
// }
// // Call the function to load the custom JSON data
// loadCustomJSON();


// // Function to generate the quiz form
// function generateQuizForm() {
//     const formContainer = document.getElementById('formContainer');
//     quizData.items.forEach(item => {
//       const questionContainer = document.createElement('div');
  
//       if (item.questionItem && item.questionItem.question) {
//         const questionElement = document.createElement('p');
//         questionElement.textContent = item.title;
//         questionContainer.appendChild(questionElement);
  
//         item.questionItem.question.choiceQuestion.options.forEach(option => {
//           const optionLabel = document.createElement('label');
//           const optionInput = document.createElement('input');
//           optionInput.type = 'radio';
//           optionInput.name = item.itemId;
//           optionInput.value = option.value;
  
//           optionLabel.appendChild(optionInput);
//           optionLabel.appendChild(document.createTextNode(option.value));
//           questionContainer.appendChild(optionLabel);
//           questionContainer.appendChild(document.createElement('br'));
//         });
  
//         formContainer.appendChild(questionContainer);
//       } else {
//         console.error(`Error: Question data missing for item with ID ${item.itemId}`);
//       }
//     });
//   }
  
  
//   // Function to handle form submission
//   function submitQuiz() {
//     const answers = [];
  
//     quizData.items.forEach(item => {
//       const selectedOption = document.querySelector(`input[name="${item.itemId}"]:checked`);
//       if (selectedOption) {
//         answers.push({ itemId: item.itemId, value: selectedOption.value });
//       }
//     });
  
//     // Here, you can handle the answers as needed (e.g., validate, process, send to server)
//     console.log(answers);
//   }
  
//   // Generate the quiz form when the page loads
//   window.onload = function() {
//     generateQuizForm();
  
//     const submitButton = document.getElementById('submitButton');
//     submitButton.addEventListener('click', submitQuiz);
//   };
  
const fs = require('fs');

// Read the JSON file
fs.readFile('../Backend/for-student/formData.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Function to generate HTML for different question types...
    function generateHTMLForQuestion(question) {
      let html = '';
      switch (question.type) {
        case 'RADIO':
          html += `<div>${question.title}</div>`;
          question.options.forEach(option => {
            html += `
              <label>
                <input type="radio" name="${question.questionId}" value="${option.value}">
                ${option.value}
              </label><br>
            `;
          });
          break;
        case 'CHECKBOX':
          html += `<div>${question.title}</div>`;
          question.options.forEach(option => {
            html += `
              <label>
                <input type="checkbox" name="${question.questionId}" value="${option.value}">
                ${option.value}
              </label><br>
            `;
          });
          break;
        case 'DROP_DOWN':
          html += `<div>${question.title}</div>`;
          html += `<select name="${question.questionId}">`;
          question.options.forEach(option => {
            html += `<option value="${option.value}">${option.value}</option>`;
          });
          html += `</select>`;
          break;
        // Add more cases for other question types if needed
        default:
          html += `<div>${question.title}</div>`;
          html += `<p>Question type not supported</p>`;
          break;
      }
      return html;
    }

    // Function to generate HTML from JSON...
    function generateHTMLFromJSON(data) {
      let html = '';
      data.items.forEach(item => {
        if (item.questionItem && item.questionItem.question) {
          const question = item.questionItem.question;
          if (question.choiceQuestion) {
            html += generateHTMLForQuestion(question.choiceQuestion);
          } else if (question.textQuestion) {
            html += `<div>${question.title}</div>`;
            html += `<textarea></textarea>`;
          }
          // Add more conditions for other question types if needed
        }
      });
      return html;
    }

    // Get the container where you want to append the generated HTML
    const container = document.getElementById('your-container-id'); // Replace with your container ID

    // Generate HTML and append to the container
    container.innerHTML = generateHTMLFromJSON(jsonData);
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
});