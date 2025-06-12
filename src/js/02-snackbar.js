import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

/* HTML elementi seçildi */
const form = document.querySelector('.form');

/* Form gönderildiğinde olayı yakala */
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault(); // Sayfanın yenilenmesini engelle

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  createPromise(delay, state)
    .then(result => {
      console.log(`✅ Fulfilled promise in ${result}ms`);
      iziToast.success({
        title: 'Success',
        message: `Fulfilled in ${result}ms`,
        position: 'topRight',
      });
    })
    .catch(error => {
      console.log(`❌ Rejected promise in ${error}ms`);
      iziToast.error({
        title: 'Error',
        message: `Rejected in ${error}ms`,
        position: 'topRight',
      });
    });
}

/* Promise fonksiyonunu oluşturma */
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
