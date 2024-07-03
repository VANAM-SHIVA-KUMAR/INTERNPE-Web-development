const display = document.getElementById('display');

function appendNumber(number) {
    if (display.innerText === '0' && number !== '.') {
        display.innerText = number;
    } else {
        display.innerText += number;
    }
}

function appendOperator(operator) {
    if (!display.innerText.endsWith(' ') && display.innerText !== '0') {
        display.innerText += ` ${operator} `;
    }
}

function clearDisplay() {
    display.innerText = '0';
}

function backspace() {
    if (display.innerText.length > 1) {
        display.innerText = display.innerText.slice(0, -1);
    } else {
        display.innerText = '0';
    }
}

function calculate() {
    try {
        display.innerText = eval(display.innerText.replace('x', '*'));
    } catch (error) {
        display.innerText = 'Error';
    }
}
