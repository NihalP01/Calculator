const display = document.getElementById("display");
let currentExpression = "";

function appendToDisplay(value) {
  if (
    ["+", "-", "*", "/"].includes(value) &&
    ["+", "-", "*", "/"].includes(currentExpression.slice(-1))
  ) {
    return;
  }

  if (display.textContent === "Error") {
    currentExpression = "";
    display.textContent = "0";
  }

  if (currentExpression === "0" || display.textContent === "0") {
    if (value !== ".") {
      currentExpression = value;
      display.textContent = value;
      return;
    }
  }

  currentExpression += value;
  display.textContent = currentExpression;
}

function calculateResult() {
  try {
    const result = eval(currentExpression);
    if (!isFinite(result)) {
      display.textContent = "Error";
      currentExpression = "";
      return;
    }
    const roundedResult = Number(result.toFixed(10));
    display.textContent = roundedResult;
    currentExpression = roundedResult.toString();
  } catch {
    display.textContent = "Error";
    currentExpression = "";
  }
}

function clearDisplay() {
  currentExpression = "0";
  display.textContent = "0";
}

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (/[0-9+\-*/.]/.test(key)) {
    appendToDisplay(key);
  }
  if (key === "Enter" || key === "=") {
    calculateResult();
  }
  if (key === "Backspace" || key === "Escape") {
    clearDisplay();
  }
});
