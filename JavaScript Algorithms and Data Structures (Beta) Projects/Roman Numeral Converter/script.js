const input = document.getElementById("number");
const output = document.getElementById("output");
const btn = document.getElementById('convert-btn');

const romanNumerals = [
  { value: 1000, numeral: 'M' },
  { value: 900, numeral: 'CM' },
  { value: 500, numeral: 'D' },
  { value: 400, numeral: 'CD' },
  { value: 100, numeral: 'C' },
  { value: 90, numeral: 'XC' },
  { value: 50, numeral: 'L' },
  { value: 40, numeral: 'XL' },
  { value: 10, numeral: 'X' },
  { value: 9, numeral: 'IX' },
  { value: 5, numeral: 'V' },
  { value: 4, numeral: 'IV' },
  { value: 1, numeral: 'I' }
];

const convertToRoman = num => {
  let result = '';
  for (let i = 0; i < romanNumerals.length; i++) {
    while (num >= romanNumerals[i].value) {
      result += romanNumerals[i].numeral;
      num -= romanNumerals[i].value;
    }
  }
  return result;
};

const handleConvert = () => {
  const number = parseInt(input.value);

  if (isNaN(number)) {
    output.textContent = 'Please enter a valid number';
  } else if (number < 1) {
    output.textContent = 'Please enter a number greater than or equal to 1';
  } else if (number >= 4000) {
    output.textContent = 'Please enter a number less than or equal to 3999';
  } else {
    output.textContent = convertToRoman(number);
  }
};

btn.addEventListener('click', event => {
    event.preventDefault();
    handleConvert();
});
input.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleConvert();
  }
});
