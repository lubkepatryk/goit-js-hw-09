// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     const selectedDate = selectedDates[0];

//     if (selectedDates < new Date()) {
//         window.alert("Please choose a date in the future");
//         return;
//   }

// const startBtn = document.querySelector('[data-start]');
// startBtn.disabled = false;
// // startBtn.addEventListener('click', () => {
// //     const endDate = selectedDate.getTime();
// //     startBtn.disabled = true;
// //     let timer = setInterval(updateTimer, 1000);
//     function updateTimer(endDate) {
//         const now = new Date().getTime();
//         const leftTime = endDate - now;
//         if (leftTime <= 0) {
//             clearInterval(timer);
//             return;
//         }
//         const { days, hours, minutes, seconds } = convertMS(leftTime);
//         const daysElement = document.querySelector('[data-days]');
//         const hoursElement = document.querySelector('[data-hours]');
//         const minutesElement = document.querySelector('[data-minutes]');
//         const secondsElement = document.querySelector('[data-seconds]');
//         daysElement.textContent = days < 10 ? String(days).padStart(2, "0");
//         hoursElement.textContent = hours < 10 ? String(hours).padStart(2, "0");
//         minutesElement.textContent = minutes < 10 ? String(minutes).padStart(2, "0");
//         secondsElement.textContent = seconds < 10 ? String(seconds).padStart(2, "0");
//     }
//     });
//   },
// };

// flatpickr("#datetime-picker", options);

// function convertMs(ms) {
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;
//     const days = Math.floor(ms / day);
//     const hours = Math.floor((ms % day) / hour);
//     const minutes = Math.floor(((ms % day) % hour) / minute);
//     const seconds = Math.floor((((ms % day) % hour) % minute) / second);
//     return { days, hours, minutes, seconds };
//   }
  
// //   input[type="text"]

// // addLeadingZero(value) padStart()

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
let timerId = null;

startBtn.setAttribute('disabled', true);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => String(value).padStart(2, 0);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    startBtn.removeAttribute('disabled');

    const timer = () => {
      const now = new Date();
      localStorage.setItem('selectedData', selectedDates[0]);
      const selectData = new Date(localStorage.getItem('selectedData'));

      if (!selectData) return;

      const diff = selectData - now;
      const { days, hours, minutes, seconds } = convertMs(diff);
      daysElement.textContent = addLeadingZero(days);
      hoursElement.textContent = addLeadingZero(hours);
      minutesElement.textContent = addLeadingZero(minutes);
      secondsElement.textContent = addLeadingZero(seconds);

      if (
        daysElement.textContent === '00' &&
        hoursElement.textContent === '00' &&
        minutesElement.textContent === '00' &&
        secondsElement.textContent === '00'
      ) {
        clearInterval(timerId);
      }
    };

    const onClick = () => {
      if (timerId) {
        clearInterval(timerId);
      }
      timer();
      timerId = setInterval(timer, 1000);
    };

    startBtn.addEventListener('click', onClick);
  },
};

flatpickr('#datetime-picker', { ...options });