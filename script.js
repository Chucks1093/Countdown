const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countDownEl = document.getElementById('countdown');
const countDownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

let countDownTitle = '';
let countDownDate = '';
let countDownValue = Date;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute("min", today)

function updateDom() {
     const now = new Date().getTime();
     const distance = countDownValue - now;
     console.log(countDownValue)
     console.log("distance" , distance)
     const days = Math.floor(distance/day);
     const hours = Math.floor((distance % days)/hour)
     console.log('hour ', hour)
     const minutes = Math.floor((distance % hours)/minute)
     const seconds = Math.floor((distance % minutes)/second)
     console.log(days , hours , minutes, seconds)
}

// Take Values from Form Input
function updateCountDown(e) {
     e.preventDefault();
     console.log(e)
     countDownTitle = e.srcElement[0].value;
     countDownDate = e.srcElement[1].value;
     // Get Number Version of current Date and update DOM
     // The getTime() gives how far (in milliseconds) a date is from
     // Jan 1st 1970 . 
     countDownValue = new Date(countDownDate).getTime();
     console.log('countDownValue :', countDownValue)
     updateDom()
}
countdownForm.addEventListener('submit', updateCountDown)