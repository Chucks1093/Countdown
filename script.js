const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countDownEl = document.getElementById('countdown');
const countDownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');


let countDownTitle = '';
let countDownDate = '';
let countDownValue = Date;
let countdownActive;
let savedCountDown;



const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


const {log} = console
//Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute("min", today)


function variable() {
     const now = new Date().getTime();
     const distance = countDownValue - now;
     const days = Math.floor(distance/day);
     const hours = Math.floor((distance % day)/hour);
     const minutes = Math.floor((distance % hour)/minute);
     const seconds = Math.floor((distance % minute)/second);
     // hIde inpcontainerut 
     inputContainer.hidden = true;

     // If countdown has ended show complete
     if (distance < 0) {
          countDownEl.hidden = true;
          clearInterval(countdownActive);
          completeElInfo.textContent = `${countDownTitle} finished on ${countDownDate}`;
          completeEl.hidden = false;
     }else {
          // show countdown in progress
          // Populate countdown with days and hours 
          // and minutes and seconds
          countDownElTitle.textContent = countDownTitle;
          timeElements[0].textContent = days;
          timeElements[1].textContent = hours;
          timeElements[2].textContent = minutes;
          timeElements[3].textContent = seconds;
          completeEl.hidden = true;
          countDownEl.hidden = false;
     }
}

function updateDom() {
     countdownActive = setInterval(variable,second);
}

// Take Values from Form Input
function updateCountDown(e) {
     e.preventDefault();
     console.log(e)
     countDownTitle = e.srcElement[0].value;
     countDownDate = e.srcElement[1].value;
     savedCountDown = {
          title : countDownTitle,
          date : countDownDate
     };
     if (countDownDate === "" ) {
          alert ("Enter a date");
     }else if (countDownTitle === "") {
          alert ("Enter a title");
     }else {
          // Get Number Version of current Date and update DOM
          // The getTime() gives how far (in milliseconds) a date is from
          // Jan 1st 1970 . 
          localStorage.setItem('countdown', JSON.stringify(savedCountDown));
          countDownValue = new Date(countDownDate).getTime();
          console.log('countDownValue :', countDownValue)
          updateDom() 
     }
}

//Reset All values
function reset() {
     //Hide countdown, show Input
     countDownEl.hidden = true;
     completeEl.hidden = true;
     inputContainer.hidden = false;
     // Stop the count 
     clearInterval(countdownActive);
     // Reset Values
     countDownTitle = '';
     countDownDate = '';
     localStorage.removeItem('countdown');
}

function restoreCountDown() {
     // Get count down from localStorage if available
     if (localStorage.getItem('countdown')) {
          inputContainer.hidden = true;
          savedCountDown = JSON.parse(localStorage.getItem('countdown'));
          countDownTitle = savedCountDown.title;
          countDownDate = savedCountDown.date;
          countDownValue = new Date(countDownDate).getTime();
          updateDom();
     }

}


countdownForm.addEventListener('submit', updateCountDown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);
window.addEventListener('DOMContentLoaded', restoreCountDown);