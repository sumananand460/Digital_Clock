// ============================================================
//                    DIGITAL CLOCK - script.js
//           Step-by-Step Explanation with Comments
// ============================================================




// ============================================================
// STEP 1 — SELECTING HTML ELEMENTS
// ============================================================
// Before we can update the clock on screen, we need to "grab"
// the HTML elements we want to change.
//
// document.getElementById('id') is a built-in JavaScript method
// that searches the HTML file for an element with that specific
// id and returns it so we can control it from JS.
//
// We store each element in a variable (const) so we can reuse
// it later without searching for it again every second.
// ============================================================

const hoursEl   = document.getElementById('hours');    // grabs <div id="hours">
const minutesEl = document.getElementById('minutes');  // grabs <div id="minutes">
const secondsEl = document.getElementById('seconds');  // grabs <div id="seconds">
const ampmEl    = document.getElementById('ampm');     // grabs <div id="ampm">
const dateEl    = document.getElementById('date');     // grabs <div id="date">




// ============================================================
// STEP 2 — CREATING ARRAYS FOR DAY AND MONTH NAMES
// ============================================================
// JavaScript's Date object gives us numbers for the day of
// the week and month (e.g. 0, 1, 2...) but NOT the names.
//
// So we create our own arrays to convert numbers into names.
// An array is a list of items stored in square brackets [].
//
// HOW IT WORKS:
// Arrays are "zero-indexed", meaning counting starts at 0.
//
//   DAYS[0]   → 'Sunday'    (Sunday is day 0 in JavaScript)
//   DAYS[1]   → 'Monday'
//   DAYS[3]   → 'Wednesday'
//
//   MONTHS[0] → 'January'   (January is month 0 in JavaScript)
//   MONTHS[11]→ 'December'
//
// So when Date gives us the number, we use it as the index
// inside the array to get the matching name.
// ============================================================

const DAYS = [
  'Sunday',     // index 0
  'Monday',     // index 1
  'Tuesday',    // index 2
  'Wednesday',  // index 3
  'Thursday',   // index 4
  'Friday',     // index 5
  'Saturday'    // index 6
];

const MONTHS = [
  'January',    // index 0
  'February',   // index 1
  'March',      // index 2
  'April',      // index 3
  'May',        // index 4
  'June',       // index 5
  'July',       // index 6
  'August',     // index 7
  'September',  // index 8
  'October',    // index 9
  'November',   // index 10
  'December'    // index 11
];




// ============================================================
// STEP 3 — THE pad() HELPER FUNCTION
// ============================================================
// This is a small reusable function that ensures numbers
// always display with TWO digits.
//
// WHY WE NEED THIS:
// If the time is 9:05:03, we want to show  "09 : 05 : 03"
// NOT                                       "9  : 5  : 3"
//
// HOW IT WORKS:
// String(n)         → converts the number to a string (text)
//                     e.g. 9 becomes "9"
//
// .padStart(2, '0') → if the string is shorter than 2 characters,
//                     it adds '0' to the START until it reaches 2
//                     e.g. "9" becomes "09"
//                     e.g. "45" stays "45" (already 2 chars)
//
// EXAMPLES:
//   pad(3)  → "03"
//   pad(11) → "11"
//   pad(0)  → "00"
// ============================================================

function pad(n) {
  return String(n).padStart(2, '0');
}




// ============================================================
// STEP 4 — THE updateClock() MAIN FUNCTION
// ============================================================
// This is the heart of the clock. It runs every single second
// and does all the work:
//   1. Gets the current time and date
//   2. Formats them correctly
//   3. Displays them on the screen
// ============================================================

function updateClock() {


  // ----------------------------------------------------------
  // STEP 4a — GET THE CURRENT TIME USING THE Date OBJECT
  // ----------------------------------------------------------
  // new Date() is a built-in JavaScript feature that creates
  // an object containing the current date AND time, pulled
  // from the user's device clock automatically.
  //
  // We then call methods on it to extract specific parts:
  //   .getHours()   → returns the hour   (0 to 23)
  //   .getMinutes() → returns the minute (0 to 59)
  //   .getSeconds() → returns the second (0 to 59)
  //
  // Notice hours uses 'let' instead of 'const' because we
  // will change its value later (12-hour conversion).
  // mins and secs use 'const' because they won't change.
  // ----------------------------------------------------------

  const now  = new Date();   // e.g. current time: 14:07:03
  let hours  = now.getHours();    // e.g. 14  (24-hour format)
  const mins = now.getMinutes();  // e.g. 7
  const secs = now.getSeconds();  // e.g. 3


  // ----------------------------------------------------------
  // STEP 4b — DETERMINE AM OR PM
  // ----------------------------------------------------------
  // .getHours() always returns 24-hour format (0–23).
  // If hours is 12 or more, it is PM. Otherwise it is AM.
  //
  // This uses a TERNARY OPERATOR — a short way to write
  // an if/else on one line:
  //
  //   condition ? "value if true" : "value if false"
  //
  // EXAMPLES:
  //   hours = 14  → 14 >= 12 is TRUE  → ampm = 'PM'
  //   hours = 9   → 9  >= 12 is FALSE → ampm = 'AM'
  //   hours = 0   → 0  >= 12 is FALSE → ampm = 'AM'  (midnight)
  // ----------------------------------------------------------

  const ampm = hours >= 12 ? 'PM' : 'AM';


  // ----------------------------------------------------------
  // STEP 4c — CONVERT FROM 24-HOUR TO 12-HOUR FORMAT
  // ----------------------------------------------------------
  // Our clock shows 12-hour time (1–12), not 24-hour (0–23).
  //
  // hours % 12  → the remainder when dividing hours by 12
  //               This converts 24hr to 12hr:
  //               e.g. 14 % 12 = 2   → so 14:00 becomes 2:xx PM
  //               e.g. 9  % 12 = 9   → so 09:00 stays  9:xx AM
  //               e.g. 0  % 12 = 0   → midnight would be 0, bad!
  //               e.g. 12 % 12 = 0   → noon would be 0, bad!
  //
  // || 12  → the OR operator kicks in when the result is 0
  //          (because 0 is "falsy" in JavaScript)
  //          so if hours % 12 gives us 0, we use 12 instead
  //          e.g. midnight (0)  → 0  || 12 = 12 ✓
  //          e.g. noon     (12) → 0  || 12 = 12 ✓
  //          e.g. 2pm      (14) → 2  || 12 = 2  ✓  (2 is truthy)
  // ----------------------------------------------------------

  hours = hours % 12 || 12;


  // ----------------------------------------------------------
  // STEP 4d — UPDATE THE TIME ON THE SCREEN
  // ----------------------------------------------------------
  // .textContent is a property that sets the visible text
  // inside an HTML element.
  //
  // We use our pad() function to make sure numbers are
  // always 2 digits wide (e.g. "07" not "7").
  //
  // EXAMPLE at 2:07:03 PM:
  //   hoursEl.textContent   → "02"
  //   minutesEl.textContent → "07"
  //   secondsEl.textContent → "03"
  //   ampmEl.textContent    → "PM"
  // ----------------------------------------------------------

  hoursEl.textContent   = pad(hours);  // e.g. "02"
  minutesEl.textContent = pad(mins);   // e.g. "07"
  secondsEl.textContent = pad(secs);   // e.g. "03"
  ampmEl.textContent    = ampm;        // e.g. "PM"


  // ----------------------------------------------------------
  // STEP 4e — BUILD AND DISPLAY THE DATE STRING
  // ----------------------------------------------------------
  // We extract the day, date number, month, and year from
  // our Date object, then combine them into one readable string.
  //
  //   .getDay()        → day of week as a number (0=Sun, 6=Sat)
  //   .getDate()       → day of month as a number (1–31)
  //   .getMonth()      → month as a number (0=Jan, 11=Dec)
  //   .getFullYear()   → full 4-digit year (e.g. 2025)
  //
  // We use the DAYS and MONTHS arrays from Step 2 to convert
  // the numbers into readable names.
  //
  // Template literals (backticks ` `) let us embed variables
  // directly inside a string using ${variable} syntax.
  //
  // EXAMPLE output: "Tuesday, March 4, 2025"
  // ----------------------------------------------------------

  const dayName   = DAYS[now.getDay()];      // e.g. "Tuesday"
  const dateNum   = now.getDate();           // e.g. 4
  const monthName = MONTHS[now.getMonth()];  // e.g. "March"
  const year      = now.getFullYear();       // e.g. 2025

  // Combine everything into one string using a template literal
  dateEl.textContent = `${dayName}, ${monthName} ${dateNum}, ${year}`;
  //                  → "Tuesday, March 4, 2025"

}




// ============================================================
// STEP 5 — RUNNING THE CLOCK
// ============================================================
// We need the clock to show the time AND keep updating it.
//
// LINE 1 — updateClock()
// We call the function ONCE immediately when the page loads.
// Without this, the clock would show "00:00:00" for the first
// second before the interval kicks in.
//
// LINE 2 — setInterval(updateClock, 1000)
// setInterval is a built-in JS function that repeatedly calls
// another function at a set time interval.
//
//   First argument  → the function to call (updateClock)
//   Second argument → how often in milliseconds (1000ms = 1 second)
//
// So setInterval calls updateClock() every 1000 milliseconds,
// which keeps the clock ticking in real time forever.
// ============================================================

updateClock();                        // run immediately on page load
setInterval(updateClock, 1000);       // then repeat every 1 second




// ============================================================
// SUMMARY — WHAT HAPPENS EVERY SECOND
// ============================================================
//
//  1. setInterval fires → calls updateClock()
//  2. new Date() fetches the current time from the device
//  3. Hours, minutes, seconds are extracted
//  4. AM/PM is determined
//  5. Hours are converted from 24hr → 12hr format
//  6. pad() ensures all numbers are 2 digits
//  7. textContent updates the visible numbers on screen
//  8. The date string is built and displayed below the clock
//  9. Wait 1 second... repeat from step 1
//
// ============================================================