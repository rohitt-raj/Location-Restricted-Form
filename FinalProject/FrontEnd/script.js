// fetch('./example.json').then(response => response.json).then(data =>
//     {
//         console.log(data);
//     }
//     )
//     .catch(error =>console.error('Error fetching JSON', error));

// JSON structure representing the quiz
// Replace this placeholder object with your actual JSON data
const quizData = {
    "formId": "FORM_ID",
    "info": {
      "title": "Famous Black Women",
      "description": "Please complete this quiz based off of this week's readings for class.",
      "documentTitle": "API Example Quiz"
    },
    "settings": {
      "quizSettings": {
        "isQuiz": true
      }
    },
    "revisionId": "00000021",
    "responderUri": "https://docs.google.com/forms/d/e/1FAIpQLSd0iBLPh4suZoGW938EU1WIxzObQv_jXto0nT2U8HH2KsI5dg/viewform",
    "items": [
      {
        "itemId": "5d9f9786",
        "imageItem": {
          "image": {
            "contentUri": "DIRECT_URL",
            "properties": {
              "alignment": "LEFT"
            }
          }
        }
      },
      {
        "itemId": "72b30353",
        "title": "Which African American woman authored \"I Know Why the Caged Bird Sings\"?",
        "questionItem": {
          "question": {
            "questionId": "25405d4e",
            "required": true,
            "grading": {
              "pointValue": 2,
              "correctAnswers": {
                "answers": [
                  {
                    "value": "Maya Angelou"
                  }
                ]
              }
            },
            "choiceQuestion": {
              "type": "RADIO",
              "options": [
                {
                  "value": "Maya Angelou"
                },
                {
                  "value": "bell hooks"
                },
                {
                  "value": "Alice Walker"
                },
                {
                  "value": "Roxane Gay"
                }
              ]
            }
          }
        }
      },
      {
        "itemId": "0a4859c8",
        "title": "Who was the first Dominican-American woman elected to state office?",
        "questionItem": {
          "question": {
            "questionId": "37fff47a",
            "grading": {
              "pointValue": 2,
              "correctAnswers": {
                "answers": [
                  {
                    "value": "Grace Diaz"
                  }
                ]
              }
            },
            "choiceQuestion": {
              "type": "RADIO",
              "options": [
                {
                  "value": "Rosa Clemente"
                },
                {
                  "value": "Grace Diaz"
                },
                {
                  "value": "Juana Matias"
                },
                {
                  "value": "Sabrina Matos"
                }
              ]
            }
          }
        }
      }
    ]
  };
  
  // ... rest of the JavaScript code remains unchanged
  
  
  // Function to generate the quiz form
// Function to generate the quiz form
function generateQuizForm() {
    const formContainer = document.getElementById('formContainer');
  
    quizData.items.forEach(item => {
      const questionContainer = document.createElement('div');
  
      if (item.questionItem && item.questionItem.question) {
        const questionElement = document.createElement('p');
        questionElement.textContent = item.title;
        questionContainer.appendChild(questionElement);
  
        item.questionItem.question.choiceQuestion.options.forEach(option => {
          const optionLabel = document.createElement('label');
          const optionInput = document.createElement('input');
          optionInput.type = 'radio';
          optionInput.name = item.itemId;
          optionInput.value = option.value;
  
          optionLabel.appendChild(optionInput);
          optionLabel.appendChild(document.createTextNode(option.value));
          questionContainer.appendChild(optionLabel);
          questionContainer.appendChild(document.createElement('br'));
        });
  
        formContainer.appendChild(questionContainer);
      } else {
        console.error(`Error: Question data missing for item with ID ${item.itemId}`);
      }
    });
  }
  
  
  // Function to handle form submission
  function submitQuiz() {
    const answers = [];
  
    quizData.items.forEach(item => {
      const selectedOption = document.querySelector(`input[name="${item.itemId}"]:checked`);
      if (selectedOption) {
        answers.push({ itemId: item.itemId, value: selectedOption.value });
      }
    });
  
    // Here, you can handle the answers as needed (e.g., validate, process, send to server)
    console.log(answers);
  }
  
  // Generate the quiz form when the page loads
  window.onload = function() {
    generateQuizForm();
  
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', submitQuiz);
  };
  