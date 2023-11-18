const jsonData = {"formId":"1FMs14ncYmTRivic_ccF6c7d_4Hjs6s7ZAxrAJXSB1No","info":{"title":"Sample Form","description":"Please answer all questions","documentTitle":"Sample Form"},"settings":{"quizSettings":{"isQuiz":true}},"revisionId":"0000001e","responderUri":"https://docs.google.com/forms/d/e/1FAIpQLScRH1JbbEOuBl5Pb5-vPMwOJgs7enUoClHR78D96S5x6ebleA/viewform","items":[{"itemId":"14032393","title":"Which day is tomorrow?","questionItem":{"question":{"questionId":"6ebdc67b","required":true,"grading":{"pointValue":1},"choiceQuestion":{"type":"RADIO","options":[{"value":"Friday"},{"value":"Saturday"}]}}}},{"itemId":"4f115acf","title":"Which year is leap year?","questionItem":{"question":{"questionId":"109e30ac","required":true,"grading":{"pointValue":1},"choiceQuestion":{"type":"RADIO","options":[{"value":"2022"},{"value":"2023"}]}}}}]}


// Function to generate HTML for different question types...
function generateHTMLForQuestion(question) {
let html = '';
switch (question.type) {
    case 'RADIO':
    // html += `<div>${question.title}</div>`;
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
    // html += `<div>${question.title}</div>`;
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
    // html += `<div>${question.title}</div>`;
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
    html += `<div>${item.title}</div>`;
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

const container = document.getElementById('formContainer'); 

// Generate HTML and append to the container
container.innerHTML = generateHTMLFromJSON(jsonData);