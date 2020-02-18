import '../../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import PNotify from '../../node_modules/pnotify/dist/es/PNotify.js';
import PNotifyButtons from '../../node_modules/pnotify/dist/es/PNotifyButtons.js';

export default function fetchCountries(searchQuery, neededCountry) {
  return fetch(searchQuery)
    .then(data => data.json())
    .then(data => {
      return neededCountry(data);
    }).catch(error => PNotify.error({text:"Error of country name!"}));
}
