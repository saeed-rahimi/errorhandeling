"use strict";
const getCountry = async (countryName) => {
  const infoDiv = document.getElementById("country-info");
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Country not found. Please check the country name.");
      } else {
        throw new Error("An error occurred while fetching data.");
      }
    }
    const data = await response.json();
    const country = data[0];
    infoDiv.innerHTML = `
        <h2>Country: ${country.name.common}</h2>
        <p><strong>Capital:</strong> ${
          country.capital ? country.capital[0] : "No capital available"
        }</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages).join(
          ", "
        )}</p>
      `;
  } catch (error) {
    if (!navigator.onLine) {
      infoDiv.innerHTML = `<p><strong>Error:</strong> You are offline. Please check your internet connection.</p>`;
    } else {
      infoDiv.innerHTML = `<p><strong>Error:</strong> ${error.message}</p>`;
    }
  }
};

document
  .getElementById("btn-germany")
  .addEventListener("click", () => getCountry("germany"));
document
  .getElementById("btn-invalid")
  .addEventListener("click", () => getCountry("dfwsewv"));
