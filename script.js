function doAdd(x, y) {
    return +x + +y;
}

function doSubtract(x, y) {
    return +x - +y;
}

function doMultiply(x, y) {
    return +x * +y;
}

function doDivide(x, y) {
    return +x / +y;
}

function splitLine(line) {
    const doOps = ['+', '-', '*', '/'];
    let operation = line.filter(e => doOps.includes(e));
    let x = line.slice(0, line.indexOf(operation[0])).join('');
    let y = line.slice(line.indexOf(operation[0]) - line.length + 1).join('');
    let parsedLine = [x, operation[0], y];
    return parsedLine;
}

function doCalc(queue) {
    /**
     * Find what operation has been requested
     * Split the queue array into operands
     * Perform and return calculation
     */

    const operands = splitLine(queue);
    const operation = operands[1];

    console.log(`Doing ${operands}`);
    switch (operation) {
        case '+':
            return doAdd(operands[0], operands[2]);
            break;
        case '-':
            return doSubtract(operands[0], operands[2]);
            break;
        case '*':
            return doMultiply(operands[0], operands[2]);
            break;
        case '/':
            return doDivide(operands[0], operands[2]);
            break;
     }
}

function updateDisplay(display) {
    displayDiv.innerHTML = '';

    display.forEach((line) => {
        let newDiv = document.createElement('div');
        let lineText = [];
        line.forEach( (token) => {
            if (['+','-','*','/','='].includes(token)) {
                lineText.push(` ${token} `);
            } else {
                lineText.push(token);
            }
        });
        newDiv.textContent = lineText.join('');
        displayDiv.appendChild(newDiv);
    });
}

function handleInput(event) {

    /**
     * Grab the event target's ID as a new token
     *   this is either a number, operation, or command.
     * 
     * If command is
     *   equals and queue is full then run the operation on the current
    *      inded and return the result.
     *   clear, then clear the current index
     *   clear all, then clear all indicies of queue
     * else
     *   add token to queue at the current index
     * 
     * Update Display
     */
    let newToken = event.target.id;
    
    if (displayMatrix[currentIndex] === undefined) {
        displayMatrix[currentIndex] = new Array();
    }

    switch (newToken) {
        case 'clear':
            displayMatrix[currentIndex] = new Array();
            break;
        case 'clearall':
            displayMatrix = new Array(5);
            currentIndex = 0;
            break;
        case '=':
            let answer = doCalc(displayMatrix[currentIndex]);
            console.log(`Got Anwer: ${answer}`);
            displayMatrix[currentIndex].push('=');
            displayMatrix[currentIndex].push(answer);
            currentIndex = (currentIndex + 1) % displayMatrix.length;
            break;
        case '.':
            /**
             * Call splitLine on the current array, so we get the terms.
             * If the left or right already have decimal, don't push new decimal.
             * Otherwise, add decimal to the array.
            */
            break;
        default:
            console.log(`Add to current line: ${newToken}`);
            displayMatrix[currentIndex].push(newToken);
            break;
    }

    updateDisplay(displayMatrix);
    console.dir(displayMatrix);
    console.log(currentIndex);
}

let displayMatrix = new Array(5);
let currentIndex = 0;
const displayDiv = document.querySelector('#display');
const inputsDiv = document.querySelector('#inputs');
inputsDiv.addEventListener('click', handleInput);