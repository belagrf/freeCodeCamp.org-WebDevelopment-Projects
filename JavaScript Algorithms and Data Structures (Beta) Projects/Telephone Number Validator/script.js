const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsDiv = document.getElementById('results-div');

const phoneRegex = /^(1)?(\(\d{3}\)|\d{3})-?\d{3}-?\d{4}$/;

const validateNumber = () => {

  const rawInput = userInput.value;
  // trim() does not work here...
  const trimmedInput = rawInput.split("").map(el => el === " " ? "" : el).join("");
  
  if (!trimmedInput) {
    alert('Please provide a phone number');
    return;
  }

  const isValid = phoneRegex.test(trimmedInput);
  
  const resultElement = document.createElement('div');
  resultElement.textContent = `${isValid ? 'Valid' : 'Invalid'} US number: ${rawInput}`;
  resultElement.style.color = isValid ? 'green' : 'red';
  resultsDiv.appendChild(resultElement);

  userInput.value = '';
};

const clearInput = () => {
  userInput.value = '';
  resultsDiv.innerHTML = '';
};

checkBtn.addEventListener('click', validateNumber);
clearBtn.addEventListener('click', clearInput);
userInput.addEventListener('keydown', e => {if (e.key === 'Enter') validateNumber})
  