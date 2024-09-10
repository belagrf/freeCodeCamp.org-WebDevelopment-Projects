const cashInput = document.getElementById("cash");
const changeDueElem = document.getElementById("change-due");
const priceScreen = document.getElementById("price-screen");

const currencyUnits = [
  ["ONE HUNDRED", 100],
  ["TWENTY", 20],
  ["TEN", 10],
  ["FIVE", 5],
  ["ONE", 1],
  ["QUARTER", 0.25],
  ["DIME", 0.1],
  ["NICKEL", 0.05],
  ["PENNY", 0.01]
];

const price = 19.5;
const cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

priceScreen.textContent = `Total: $${price.toFixed(2)}`;

const roundToTwoDecimals = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

const calculateChange = (changeDue) => {
  const reversedCid = cid.slice().reverse();
  const totalCID = parseFloat(cid.map(total => total[1]).reduce((prev, curr) => roundToTwoDecimals(prev + curr))
  );
  let change = [];

  if (totalCID < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  const status = totalCID === changeDue ? 'CLOSED' : 'OPEN';

  for (let i = 0; i < currencyUnits.length && changeDue > 0; i++) {
    let amount = 0;
    const [unit, coinValue] = currencyUnits[i];

    while (roundToTwoDecimals(changeDue) >= coinValue && reversedCid[i][1] > 0) {
      amount = roundToTwoDecimals(amount + coinValue);
      reversedCid[i][1] = roundToTwoDecimals(reversedCid[i][1] - coinValue);
      changeDue = roundToTwoDecimals(changeDue - coinValue);
    }
    if (amount > 0) {
      change.push([unit, amount]);
    }
  }

  return changeDue > 0 ? { status: "INSUFFICIENT_FUNDS", change: [] } : { status, change };
};

const handlePurchase = () => {
  const cash = parseFloat(cashInput.value);
  if (isNaN(cash) || cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    changeDueElem.textContent = "No change due - customer paid with exact cash";
    return;
  }

  const { status, change } = calculateChange(roundToTwoDecimals(cash - price));

  changeDueElem.textContent = status === "INSUFFICIENT_FUNDS"
    ? "Status: INSUFFICIENT_FUNDS"
    : `Status: ${status} ${change.map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`).join(" ")}`;

  updateCashDrawerDisplay();
};

const updateCashDrawerDisplay = () => {
  cid.forEach(([unit, amount]) => {
    const element = document.getElementById(`${unit.toLowerCase()}-amount`);
    if (element) {
      element.textContent = `$${amount}`;
    }
  });
};

document.querySelectorAll('.key').forEach(button => {
  button.addEventListener('click', function() {
    if (this.classList.contains('enter')) {
      handlePurchase();
    } else if (this.classList.contains('clear')) {
      cashInput.value = '';
    } else {
      cashInput.value += this.textContent;
    }
  });
});

updateCashDrawerDisplay();