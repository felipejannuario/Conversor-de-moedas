document.addEventListener('DOMContentLoaded', (event) => {
    const currencySelectFrom = document.querySelector('.currency-select-from');
    const currencySelectTo = document.querySelector('.currency-select-to');
    const convertButton = document.querySelector('.convert-button');

    currencySelectFrom.addEventListener('change', updateCurrencyImages);
    currencySelectTo.addEventListener('change', updateCurrencyImages);
    convertButton.addEventListener('click', convertValues);
});

function updateCurrencyImages() {
    const currencySelectFrom = document.querySelector('.currency-select-from');
    const currencySelectTo = document.querySelector('.currency-select-to');
    const currencyImageFrom = document.querySelector('.currency-image-from');
    const currencyImageTo = document.querySelector('.currency-image-to');
    const currencyTextFrom = document.querySelector('.currency-from');
    const currencyTextTo = document.querySelector('.currency-to');

    updateCurrencyImage(currencySelectFrom, currencyImageFrom, currencyTextFrom);
    updateCurrencyImage(currencySelectTo, currencyImageTo, currencyTextTo);
}

function updateCurrencyImage(selectElement, imageElement, textElement) {
    if (selectElement.value === 'real') {
        imageElement.src = '/assets/Real.png';
        imageElement.alt = 'logo-moeda-a-converter';
        textElement.textContent = 'Real';
    } else if (selectElement.value === 'dolar') {
        imageElement.src = '/assets/dolar.png';
        imageElement.alt = 'logo-moeda-convertida';
        textElement.textContent = 'Dólar';
    } else if (selectElement.value === 'euro') {
        imageElement.src = '/assets/euro.png';
        imageElement.alt = 'logo-moeda-convertida';
        textElement.textContent = 'Euro';
    } else if (selectElement.value === 'libra') {
        imageElement.src = '/assets/libra.png';
        imageElement.alt = 'logo-moeda-convertida';
        textElement.textContent = 'Libra';
    } else if (selectElement.value === 'bitcoin') {
        imageElement.src = '/assets/bitcoin.png';
        imageElement.alt = 'logo-moeda-convertida';
        textElement.textContent = 'Bitcoin';
    }
}

function convertValues() {
    const inputCurrencyValue = parseFloat(document.querySelector('.input-currency').value.replace(/[^0-9,.-]+/g, '').replace(',', '.'));
    const currencySelectFrom = document.querySelector('.currency-select-from');
    const currencySelectTo = document.querySelector('.currency-select-to');
    const currencyValueToConvert = document.querySelector('.currency-value-to-convert');
    const currencyValueConverted = document.querySelector('.currency-value');

    const exchangeRates = {
        real: 1,
        dolar: 5.66,
        euro: 6.7,
        libra: 7.15,
        bitcoin: 355517.37,
    };

    if (isNaN(inputCurrencyValue)) {
        alert('Por favor, insira um valor válido.');
        return;
    }

    const fromRate = exchangeRates[currencySelectFrom.value];
    const toRate = exchangeRates[currencySelectTo.value];
    const convertedValue = (inputCurrencyValue * fromRate) / toRate;

    currencyValueConverted.innerHTML = new Intl.NumberFormat(getLocale(currencySelectTo.value), {
        style: 'currency',
        currency: getCurrencyCode(currencySelectTo.value)
    }).format(convertedValue);

    currencyValueToConvert.innerHTML = new Intl.NumberFormat(getLocale(currencySelectFrom.value), {
        style: 'currency',
        currency: getCurrencyCode(currencySelectFrom.value)
    }).format(inputCurrencyValue);
}

function getLocale(currency) {
    switch (currency) {
        case 'dolar': return 'en-US';
        case 'euro': return 'de-DE';
        case 'libra': return 'en-GB';
        case 'bitcoin': return 'en-US';
        case 'real': return 'pt-BR';
        default: return 'en-US';
    }
}

function getCurrencyCode(currency) {
    switch (currency) {
        case 'dolar': return 'USD';
        case 'euro': return 'EUR';
        case 'libra': return 'GBP';
        case 'bitcoin': return 'BTC';
        case 'real': return 'BRL';
        default: return 'USD';
    }
}

