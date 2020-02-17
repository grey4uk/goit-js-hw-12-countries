import './css/styles.css';
import "../node_modules/pnotify/dist/PNotifyBrightTheme.css";
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
  if (event.target.value === null) {
    return;
  }
  fetchCountries(searchQuery + event.target.value, arrayOfCountries);
}

function arrayOfCountries(arrayCountries) {
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
      buttons: [
        {
          text: 'Ok',
          textTrusted: false,
          addClass: '',
          primary: true,
          // Whether to trigger this button when the user hits enter in a single line
          // prompt. Also, focus the button if it is a modal prompt.
          promptTrigger: true,
          click: (notice, value) => {
            notice.close();
            notice.fire('pnotify.confirm', {notice, value});
          }
        },
        {
          text: 'Cancel',
          textTrusted: false,
          addClass: '',
          click: (notice) => {
            notice.close();
            notice.fire('pnotify.cancel', {notice});
          }
        }
      ]
    });
   
  } else if (arrayCountries.length > 1 && arrayCountries.length <= 10) {
    ulCountries.insertAdjacentHTML(
      'beforeend',
      arrayCountries.reduce((acc, country) => {
        return (acc += `<li>${country.name}</li>`);
      }, ''),
    );
  } else if ((arrayCountries.length = 1)) {
    ulCountries.insertAdjacentHTML(
      'beforeend',
      countriesTemplate(arrayCountries[0]),
    );
  }
}
function clearList() {
  ulCountries.innerHTML = '';
}
// menuList.insertAdjacentHTML('beforeend', createMenuList(menu));

// function functionData(country) {
//   ulCounty.innerHTML = '';
//   country.forEach(countryItem => {
//     ulCounty.insertAdjacentHTML(
//       'beforeend',
//       `<li class="li" data-name = ${countryItem.name} data-location =
// "${countryItem.location}"> <h2>${countryItem.name}</h2> <img
// src=${countryItem.flag} alt =${countryItem.name}></li>`,
//     );
//   });
//   document.body.appendChild(ulCounty);
// }
