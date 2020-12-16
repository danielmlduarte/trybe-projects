window.onload = () => {
  setupEventHandlers();
}

const setupEventHandlers = () => {
  const searchButton = document.querySelector('#search-button');
  const clearButton = document.querySelector('#clear-button');
  searchButton.addEventListener('click', handleSearchEvent);
  clearButton.addEventListener('click', cleanList);
}

const handleSearchEvent = () => {
  const currency = document.querySelector('#currency-input').value;
  const currencyUpperCased = currency.toUpperCase();

  cleanList();
  
  if (currencyUpperCased === '') {
    showAlert('A moeda deve ser informada');

  } else {
    // fetchCurrency(currencyUpperCased);
    if (currencyUpperCased === 'BTC') {
      fetchBTCAwaitAsync();
    } else {
      fetchCurrencyAwaitAsync(currencyUpperCased);
    }
  }
}

const showAlert = (message) => {
  window.alert(message);
}

// const fetchCurrency = (currency) => {
//   const endpoint = `https://api.ratesapi.io/api/latest?base=${currency}`;

//   fetch(endpoint)
//     .then((response) => response.json())
//     .then((object) => {
//       if (object.error) {
//         throw new Error(object.error)
//       } else {
//         handleRates(object.rates);
//       }
//     })
//     .catch((error) => showAlert(error));
// }

const fetchBTCAwaitAsync = async () => {
  const endpoint = 'https://api.coindesk.com/v1/bpi/currentprice.json';

  try {
    const response = await fetch(endpoint);
    const object = await response.json();
    const formattedObject = btcFormatObject(object.bpi);
    handlesBTC(formattedObject);
  } catch (error) {
    showAlert(error);
  }
}

const fetchCurrencyAwaitAsync = async (currency) => {
  const endpoint = `https://api.ratesapi.io/api/latest?base=${currency}`;

  try {
    const response = await fetch(endpoint);
    const object = await response.json();

    if (object.error) {
      throw new Error(object.error);
    } else {
      handleRates(object.rates);
    }
  } catch (error) {
    showAlert(error);
  }
}

const handleRates = (rates) => {
  const ratesEntries = Object.entries(rates);

  // ratesEntries.forEach(renderRate);
  ratesEntries.sort((a, b) => a[0].localeCompare(b[0]));
  ratesEntries.forEach((entry) => renderRate(entry));
}

const renderRate = ([ currency, value ]) => {
  const ul = document.querySelector('#currency-list');
  const li = document.createElement("li");
  li.innerHTML = `${currency}: ${value}`
  ul.appendChild(li)
}

const cleanList = () => {
  const ul = document.querySelector('#currency-list');
  ul.innerHTML = '';
}

const btcFormatObject = (object) => {
  const btcEntries = Object.entries(object);
  return btcEntries.map((currency) => [currency[0], currency[1].rate]);
}

const handlesBTC = (rates) => {
  rates.sort((a, b) => a[0].localeCompare(b[0]));
  rates.forEach((entry) => renderRate(entry));
}
