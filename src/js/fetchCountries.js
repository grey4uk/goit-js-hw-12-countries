import '../../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import PNotify from '../../node_modules/pnotify/dist/es/PNotify.js';
import PNotifyButtons from '../../node_modules/pnotify/dist/es/PNotifyButtons.js';

// export default function fetchCountries(searchQuery, neededCountry) {
//   return fetch(searchQuery)
//     .then(data => data.json())
//     .then(data => {
//       return neededCountry(data);
//     })
//     .catch(error => {
//       PNotify.error({ text: 'Error of country name!' });
//       }
//     );
// }
let storage = {};
const STORAGE = "ourApp";
export default function fetchCountries(searchQuery, neededCountry){
  
  if (localStorage.getItem(STORAGE)){
    storage = JSON.parse(localStorage.getItem(STORAGE));
  }else{
    localStorage.setItem(STORAGE, JSON.stringify(storage));
  }
  
    if (storage[searchQuery]){
      neededCountry(storage[searchQuery]);
      return;
    }
    fetch(searchQuery).then(response=>response.json()).
    then(data=>{
      
      storage[searchQuery] = data;
      localStorage.setItem(STORAGE, JSON.stringify(storage));
      neededCountry(data);}
    
    ).
    catch(error=>{
      PNotify.error(error);
      throw new Error(error);
    });
}