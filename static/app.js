function getHistory() {
  return document.getElementById("history-value").innerText;
}
function printHistory(num) {
  document.getElementById("history-value").innerText = num;
}
function getOutput() {
  return document.getElementById("output-value").innerText;
}
function printOutput(num) {
  if (num == "") {
    document.getElementById("output-value").innerText = num;
  } else {
    document.getElementById("output-value").innerText = getFormattedNumber(num);
  }
}
function getFormattedNumber(num) {
  if (num == "-") {
    return "";
  }
  let n = Number(num);
  let value = n.toLocaleString("en");
  return value;
}
function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ""));
}

// add this as a method to the Personality class
// function playCharacter() {
function playCharacter(character) {
  const audio = document.querySelector(`audio.${character}`);
  console.log(audio);
  audio.play();
}

// user selects a character
// the calc page loads and the character greets the user
window.addEventListener("load", playCharacterGreeting);

function playCharacter() {
  const audio = document.querySelector(`audio.mike`);
  console.log(audio);
  audio.play();
}

function playCharacterGreeting() {
  const audio = document.querySelector(`audio.jim`);
  console.log(audio);
  audio.play();
}

// OPERATOR CALC
let operator = document.getElementsByClassName("operator");
for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function() {
    if (this.id == "clear") {
      printHistory("");
      printOutput("");
    } else if (this.id == "backspace") {
      let output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        //if output has a value
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
    } else {
      let output = getOutput();
      let history = getHistory();
      // ALLOW USER TO CHANGE OPERATOR
      if (output == "" && history != "") {
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }
      if (output != "" || history != "") {
        output = output == "" ? output : reverseNumberFormat(output);
        history = history + output;
        if (this.id == "=") {
          //FIND THE CALCULATION

          // play MP3 of character find the calculation
          playCharacter();
          //   const audio = document.querySelector("audio");
          //   audio.play();

          // Generate random operator
          let operator = ["+", "-", "/", "*"];
          let randomOperator =
            operator[Math.floor(operator.length * Math.random())];

          // split up user input to get operation sign
          let result = history.split("");

          let newOperator = result.map(res => {
            if (isNaN(res)) {
              res = randomOperator;
            }
            return res;
          });

          // Put equation back together
          let newEquation = eval(newOperator.join(""));
          printHistory(history);
          printOutput("");

          // do an await for the mp3 duration instead of setTimeout
          setTimeout(() => {
            printOutput(newEquation);
          }, 5000);
        } else {
          history = history + this.id;
          printHistory(history);
          printOutput("");
        }
      }
    }
  });
}
let number = document.getElementsByClassName("number");
for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function() {
    let output = reverseNumberFormat(getOutput());
    if (output != NaN) {
      //if output is a number
      output = output + this.id;
      printOutput(output);
    }
  });
}

// Ask if character got the answer right, boolean
/////// yes
//////////play yes mp3
/////// no
//////////play no mp3
// if output || history not empty clear the module/questions
