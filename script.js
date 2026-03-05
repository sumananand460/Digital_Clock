// Grab all elements
const hoursEl   = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const ampmEl    = document.getElementById('ampm');
const dateEl    = document.getElementById('date');

// Day and month name arrays
const DAYS   = ['Sunday','Monday','Tuesday','Wednesday',
                'Thursday','Friday','Saturday'];
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

// Zero-pad single-digit numbers
function pad(n) {
  return String(n).padStart(2, '0');
}

function updateClock() {
  const now   = new Date();
  let hours   = now.getHours();
  const mins  = now.getMinutes();
  const secs  = now.getSeconds();

  // Determine AM / PM
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  // Update time display
  hoursEl.textContent   = pad(hours);
  minutesEl.textContent = pad(mins);
  secondsEl.textContent = pad(secs);
  ampmEl.textContent    = ampm;

  // Update date display
  const dayName   = DAYS[now.getDay()];
  const dateNum   = now.getDate();
  const monthName = MONTHS[now.getMonth()];
  const year      = now.getFullYear();
  dateEl.textContent = `${dayName}, ${monthName} ${dateNum}, ${year}`;
}

// Run once immediately, then every second
updateClock();
setInterval(updateClock, 1000);