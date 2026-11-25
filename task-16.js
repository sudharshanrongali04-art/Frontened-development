const currentValueElement = document.getElementById("current-value");
let expression = "0";
let justCalculated = false;

function updateDisplay() {
    currentValueElement.textContent = expression || "0";
}

function clearCalculator() {
    expression = "0";
    justCalculated = false;
    updateDisplay();
}

function deleteDigit() {
    if (expression === "0" || expression === "Error" || justCalculated) {
        clearCalculator();
        return;
    }
    expression = expression.length > 1 ? expression.slice(0, -1) : "0";
    updateDisplay();
}

function appendNumber(number) {
    if (expression === "Error" || justCalculated) {
        expression = "0";
        justCalculated = false;
    }

    if (number === "." && /(?:^|[+\-*/%])\d*\.$/.test(expression)) return;

    const parts = expression.split(/[+\-*/%]/);
    const lastPart = parts[parts.length - 1];
    if (number === "." && lastPart.includes(".")) return;

    if (expression === "0" && number !== ".") {
        expression = number;
    } else if (expression === "0" && number === ".") {
        expression = "0.";
    } else {
        expression += number;
    }
    updateDisplay();
}

function toggleSign() {
    if (expression === "0" || expression === "Error") return;
    const lastOperatorIndex = Math.max(
        expression.lastIndexOf("+"),
        expression.lastIndexOf("-"),
        expression.lastIndexOf("*"),
        expression.lastIndexOf("/"),
        expression.lastIndexOf("%")
    );

    if (lastOperatorIndex === -1) {
        expression = expression.startsWith("-")
            ? expression.slice(1)
            : "-" + expression;
    } else {
        const start = expression.slice(0, lastOperatorIndex + 1);
        const end = expression.slice(lastOperatorIndex + 1);
        if (!end) return;
        expression = end.startsWith("-")
            ? start + end.slice(1)
            : start + "-" + end;
    }
    justCalculated = false;
    updateDisplay();
}

function chooseOperation(operation) {
    if (expression === "Error") clearCalculator();
    if (justCalculated) justCalculated = false;
    if (/[+\-*/%]$/.test(expression)) {
        expression = expression.slice(0, -1) + operation;
    } else {
        expression += operation;
    }
    updateDisplay();
}

function formatNumber(value) {
    if (!Number.isFinite(value)) return "Error";
    if (Object.is(value, -0)) return "0";
    return String(Number.parseFloat(value.toPrecision(12)));
}

function calculateExpression(value) {
    const tokens = value.match(/(?:^|(?<=[+\-*\/%]))-?\d+(?:\.\d*)?|[+\-*\/%]/g);
    if (!tokens) return "Error";

    const numbers = [];
    const operations = [];
    const precedence = { "+": 1, "-": 1, "*": 2, "/": 2, "%": 2 };

    function applyOperation() {
        const operation = operations.pop();
        const second = numbers.pop();
        const first = numbers.pop();
        if (operation == null || first == null || second == null) return false;

        let result;
        if (operation === "+") result = first + second;
        if (operation === "-") result = first - second;
        if (operation === "*") result = first * second;
        if (operation === "/") result = second === 0 ? NaN : first / second;
        if (operation === "%") result = second === 0 ? NaN : first % second;
        numbers.push(result);
        return true;
    }

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (/^-?\d+(?:\.\d*)?$/.test(token)) {
            numbers.push(Number(token));
        } else {
            while (
                operations.length &&
                precedence[operations[operations.length - 1]] >= precedence[token]
            ) {
                if (!applyOperation()) return "Error";
            }
            operations.push(token);
        }
    }

    while (operations.length) {
        if (!applyOperation()) return "Error";
    }
    return formatNumber(numbers[0]);
}

function calculateResult() {
    if (!/[+\-*/%]/.test(expression) || /[+\-*/%]$/.test(expression)) return;
    expression = calculateExpression(expression);
    justCalculated = true;
    updateDisplay();
}

document.querySelectorAll("[data-number]").forEach((button) => {
    button.addEventListener("click", () => appendNumber(button.dataset.number));
});

document.querySelectorAll("[data-operation]").forEach((button) => {
    button.addEventListener("click", () => chooseOperation(button.dataset.operation));
});

document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;
        if (action === "clear") clearCalculator();
        if (action === "delete") deleteDigit();
        if (action === "sign") toggleSign();
        if (action === "equals") calculateResult();
    });
});

document.addEventListener("keydown", (event) => {
    if (/^\d$/.test(event.key) || event.key === ".") {
        appendNumber(event.key);
    } else if (["+", "-", "*", "/", "%"].includes(event.key)) {
        chooseOperation(event.key);
    } else if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        calculateResult();
    } else if (event.key === "Backspace") {
        deleteDigit();
    } else if (event.key === "Escape") {
        clearCalculator();
    }
});

clearCalculator();