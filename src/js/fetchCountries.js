export default function fetchCountries(searchQuery, neededCountry) {
  return fetch(searchQuery)
    .then(data => data.json())
    .then(data => {
      return neededCountry(data);
    });
}
