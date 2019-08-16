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

// user selects a character
// the calc page loads and the character greets the user
window.addEventListener("load", playCharacterGreeting);

// // MAKING STEVE'S GREETING
async function playCharacterGreeting() {
  const audio = document.querySelectorAll(`audio.steve-intro`);
  let randomAudio = audio[Math.floor(audio.length * Math.random())];
  await randomAudio.play();
}
const audio = document.querySelectorAll("audio.steve-equals");
let randomAudio = audio[Math.floor(audio.length * Math.random())];

async function playEqualsAudio() {
  await randomAudio.play();
}

let feedbackModal = document.querySelector(".feedback-modal");
feedbackModal.style.display = "none";

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
          randomAudio = audio[Math.floor(audio.length * Math.random())];

          playEqualsAudio();
          let duration = randomAudio.duration;
          setTimeout(() => {
            printOutput(newEquation);
          }, duration * 1000);
          // POPUP MODAL
          setTimeout(() => {
            feedbackModal.style.display = "block";
          }, duration * 1000 + 1000);
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

let yesFeedback = document.getElementById("yes");
let noFeedback = document.getElementById("no");

async function playYesResponse() {
  const audio = document.querySelectorAll(`audio.steve-yes`);
  let randomAudio = audio[Math.floor(audio.length * Math.random())];
  await randomAudio.play();
}

async function playNoResponse() {
  const audio = document.querySelectorAll(`audio.steve-no`);
  let randomAudio = audio[Math.floor(audio.length * Math.random())];
  await randomAudio.play();
}

yesFeedback.addEventListener("click", playYesResponse);
noFeedback.addEventListener("click", playNoResponse);

// noFeedback.addEventListener('click', playNoResponse) {
//   //
// }

function showFeedbackModal() {}

// Ask if character got the answer right, boolean
/////// yes
//////////play yes mp3
/////// no
//////////play no mp3
// if output || history not empty clear the module/questions
