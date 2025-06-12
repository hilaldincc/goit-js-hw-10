import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

/* html elementlerini seçtik */
const startButton = document.querySelector('[data-start]');
const dateInput = document.querySelector('#datetime-picker');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
/* Flatpickr’i başlat ve tarih kontrolü yap */
let selectedDate = null;
let timerId = null;

startButton.disabled = true; // Başta devre dışı

flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      iziToast.error({
        title: 'Hata',
        message: 'Lütfen gelecekte bir tarih seçin!',
        position: 'topRight',
      });
      startButton.disabled = true;
    } else {
      selectedDate = selectedDates[0];
      startButton.disabled = false;
    }
  },
});

/* Butona tıklanınca sayaç başlasın */
startButton.addEventListener('click', () => {
  startButton.disabled = true; // Tekrar tıklamayı engelle

  timerId = setInterval(() => {
    const now = new Date();
    const diff = selectedDate - now;

    if (diff <= 0) {
      clearInterval(timerId);
      iziToast.success({
        title: 'Tamamlandı',
        message: 'Geri sayım sona erdi!',
        position: 'topRight',
      });
      startButton.disabled = true;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }, 1000);
});

/* Yardımcı fonksiyonlar */
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
