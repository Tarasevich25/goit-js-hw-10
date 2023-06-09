import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import { addCountryList, addCountryInfo } from './js/markup';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

function alertNoSuchCountry() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function alertSpecificName() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function clearPage() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function inputCountry() {
  const name = refs.input.value.trim();
  if (!name) {
    return clearPage();
    // (refs.countryList.innerHTML = ''), (refs.countryInfo.innerHTML = '');
  }

  fetchCountries(name)
    .then(data => {
      clearPage();
      // refs.countryList.innerHTML = '';
      // refs.countryInfo.innerHTML = '';
      if (data.length === 1) {
        // refs.countryList.insertAdjacentHTML('beforeend', addCountryList(data));
        refs.countryInfo.insertAdjacentHTML('beforeend', addCountryInfo(data));
      } else if (data.length >= 10) {
        alertSpecificName();
      } else {
        refs.countryList.insertAdjacentHTML('beforeend', addCountryList(data));
      }
    })
    .catch(err => {
      if (err.message === 404) {
        alertNoSuchCountry();
      }
      else console.log(err.message)
    });
}

refs.input.addEventListener('input', debounce(inputCountry, DEBOUNCE_DELAY));