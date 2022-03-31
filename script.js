let operator1 = "";
let operator2 = "";
let operatorString = "";
let currentOperand;
let result = 0;
let decimal = false;
let display = document.querySelector(".screen");

let number = document.querySelectorAll(".int");
for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", numberClick);
}

let operator = document.querySelectorAll(".operator");
for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener("mousedown", operandClick);
}

let operation = document.querySelector("#equal");
operation.addEventListener("mousedown", mathOperation);

let clearbtn = document.querySelector("#clear");
clearbtn.addEventListener("mousedown", clear);

let undobtn = document.querySelector("#undo");
undobtn.addEventListener("mousedown", undo);

let decibtn = document.querySelector("#decimal");
decibtn.addEventListener("mousedown", numberClick);

window.onkeydown = function (e) {
  if (e.keyCode >= 96 && e.keyCode <= 105) {
    numberClickKeyboard(e);
  } else if (
    e.keyCode == 107 ||
    e.keyCode == 109 ||
    e.keyCode == 106 ||
    e.keyCode == 111 ||
    e.keyCode == 61 ||
    e.keyCode == 173
  ) {
    console.log(e.key);
    operandClickKeyboard(e);
  } else if (e.keyCode == 13) {
    mathOperation();
  } else if (e.keyCode == 8) {
    undo();
  } else if (e.keyCode == 46) {
    clear();
  } else if (e.keyCode == 110) {
    numberClickKeyboard(e);
  }
};

function numberClick(e) {
  if (operatorString == '<span class="divbyzero">Can\'t divide by 0</span>') {
    display.innerHTML = "";
    operatorString = "";
    currentOperand = undefined;
    operator1 = "";
    operator2 = "";
  }
  if (decimal == false) {
    operatorString += e.target.innerHTML;
    display.innerHTML = operatorString;

    if (currentOperand == undefined) {
      operator1 += e.target.innerHTML;
    } else {
      operator2 += e.target.innerHTML;
    }
  }
}
function operandClick(e) {
  result = 0;
  if (operator2 == "" && currentOperand == undefined) {
    operatorString += e.target.innerHTML;
    display.innerHTML = operatorString;
    currentOperand = e.target.innerHTML;
    decimal = false;
  }
}

function numberClickKeyboard(e) {
  if (operatorString.length > 14) {
    display.style.fontSize = "20px";
    display.style.wordWrap = "break-word";
  }

  if (operatorString == '<span class="divbyzero">Can\'t divide by 0</span>') {
    display.innerHTML = "";
    operatorString = "";
    currentOperand = undefined;
    operator1 = "";
    operator2 = "";
  }
  if (decimal == false) {
    operatorString += e.key;
    display.innerHTML = operatorString;

    if (currentOperand == undefined) {
      operator1 += e.key;
    } else {
      operator2 += e.key;
    }
  }
}
function operandClickKeyboard(e) {
  result = 0;
  if (operator2 == "" && currentOperand == undefined) {
    operatorString += e.key;
    display.innerHTML = operatorString;
    currentOperand = e.key;
  }
}

function clear() {
  display.innerHTML = "";
  operatorString = "";
  currentOperand = undefined;
  operator1 = "";
  operator2 = "";
}

function undo() {
  operatorString = String(operatorString);
  let len = +operatorString.length;
  operatorString = operatorString.slice(0, len - 1);
  display.innerHTML = operatorString;
  operator2 = "";
  currentOperand = undefined;
  operator1 = operatorString;
}

function check() {
  console.log(`\n\n\noperator1 : ${operator1}`);
  console.log(`operator2 : ${operator2}`);
  console.log(`operatorString : ${operatorString}`);
  console.log(`currentOperand : ${currentOperand}`);
  console.log(`result : ${result}`);
}

function mathOperation() {
  check();
  if (currentOperand == "+") add();
  if (currentOperand == "-") subtract();
  if (currentOperand == "x" || currentOperand == "*") multiply();
  if (currentOperand == "÷" || currentOperand == "/") divide();

  display.innerHTML = result;
  operatorString = "";
  currentOperand = undefined;
  operator1 = "";
  operator2 = "";
}

function add() {
  result = +operator1 + +operator2;
}

function subtract() {
  result = +operator1 - +operator2;
}
function multiply() {
  result = +operator1 * +operator2;
}

function divide() {
  if (+operator2 == 0) {
    result = '<span class="divbyzero">Can\'t divide by 0</span>';
  } else {
    result = +operator1 / +operator2;
  }
}
