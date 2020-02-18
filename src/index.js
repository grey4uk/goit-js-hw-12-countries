import './css/styles.css';
import '../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import countriesTemplate from './templates/CountriesTamplate.hbs';
import fetchCountries from './js/fetchCountries.js';
import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';
import PNotifyButtons from '../node_modules/pnotify/dist/es/PNotifyButtons.js';

const ulCountries = document.querySelector('.countries-list');
const input = document.querySelector('#input');
input.addEventListener('input', _.debounce(preparedData, 500));
const searchQuery = 'https://restcountries.eu/rest/v2/name/';
function preparedData(event) {
  clearList();
  if (!event.target.value) {
    return;
  }
  fetchCountries(searchQuery + event.target.value, arrayOfCountries);
}

function arrayOfCountries(arrayCountries) {
  PNotify.closeAll();
  if (arrayCountries.length > 10) {
    PNotify.error({
      text: 'Too many matches found. Please enter a more specific query!',
      stack: {
        height: '200px',
        dir1: 'down',
        dir2: 'right', // Position from the top left corner.
        firstpos1: 50,
        firstpos2: 200, // 90px from the top, 90px from the left.
      },
    });
  } else if (arrayCountries.length > 1 && arrayCountries.length <= 10) {
    ulCountries.insertAdjacentHTML(
      'beforeend',
      arrayCountries.reduce((acc, country) => {
        return (acc += `<li>${country.name}</li>`);
      }, ''),
    );
  } else if ((arrayCountries.length = 1&&arrayCountries.length > 0)) {
    ulCountries.insertAdjacentHTML(
      'beforeend',
      countriesTemplate(arrayCountries[0]),
    );
  }else{ PNotify.error({ text: 'Error of country name!' });}
}
function clearList() {
  ulCountries.innerHTML = '';
}
