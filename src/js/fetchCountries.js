export function fetchCountries(name) {
    const response =  fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
    );
    if (!response.ok) {
      throw new Error(response.status);
    }
    return  response.json();
  }