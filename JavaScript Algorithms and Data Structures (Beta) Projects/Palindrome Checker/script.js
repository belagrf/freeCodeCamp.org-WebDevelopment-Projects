const isPalindrome = str => {
    const alphanumeric = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return alphanumeric === alphanumeric.split('').reverse().join('');
  };
  
  const checkPalindrome = () => {
    const inputElement = document.getElementById('text-input');
    const resultElement = document.getElementById('result');
    const input = inputElement.value.trim()
    
    if (input === "") {
      alert("Please input a value");
      inputElement.value = "";
      return;
    }
  
    resultElement.textContent = isPalindrome(input) ? `${input} is a palindrome!` : `${input} is not a palindrome.`;
    inputElement.value = "";
    if (isPalindrome(input)) {
      throwConfetti();
    }
  };
  
  const throwConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
      });
    };
  
  
  document.getElementById('check-btn').addEventListener('click', checkPalindrome);