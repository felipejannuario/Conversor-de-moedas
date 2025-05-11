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

// function convertValues() {
//     const inputCurrencyValue = parseFloat(document.querySelector('.input-currency').value.replace(/[^0-9,.-]+/g, '').replace(',', '.'));
//     const currencySelectFrom = document.querySelector('.currency-select-from');
//     const currencySelectTo = document.querySelector('.currency-select-to');
//     const currencyValueToConvert = document.querySelector('.currency-value-to-convert');
//     const currencyValueConverted = document.querySelector('.currency-value');

//     // Taxas de câmbio fixas (exemplo)
//     const exchangeRates = {
//         real: 1,        // 1 Real = 1 Real
//         dolar: 5.66,    // 1 Real = 5.66 Dólares
//         euro: 6.7,      // 1 Real = 6.7 Euros
//         libra: 7.15,    // 1 Real = 7.15 Libras
//         bitcoin: 355517.37, // 1 Real = 355517.37 Bitcoins
//     };

//     if (isNaN(inputCurrencyValue)) {
//         alert('Por favor, insira um valor válido.');
//         return;
//     }

//     const fromRate = exchangeRates[currencySelectFrom.value];
//     const toRate = exchangeRates[currencySelectTo.value];
//     const convertedValue = (inputCurrencyValue * fromRate) / toRate;

//     currencyValueConverted.innerHTML = new Intl.NumberFormat(getLocale(currencySelectTo.value), {
//         style: 'currency',
//         currency: getCurrencyCode(currencySelectTo.value)
//     }).format(convertedValue);

//     currencyValueToConvert.innerHTML = new Intl.NumberFormat(getLocale(currencySelectFrom.value), {
//         style: 'currency',
//         currency: getCurrencyCode(currencySelectFrom.value)
//     }).format(inputCurrencyValue);
// }

async function convertValues() {
    const inputValueRaw = document.querySelector('.input-currency').value;
    const inputCurrencyValue = parseFloat(inputValueRaw.replace(/[^0-9,.-]+/g, '').replace(',', '.'));
    const currencySelectFrom = document.querySelector('.currency-select-from');
    const currencySelectTo = document.querySelector('.currency-select-to');
    const currencyValueToConvert = document.querySelector('.currency-value-to-convert');
    const currencyValueConverted = document.querySelector('.currency-value');

    if (isNaN(inputCurrencyValue)) {
        alert('Por favor, insira um valor válido.');
        return;
    }

    const fromCurrencyCode = getCurrencyCode(currencySelectFrom.value);
    const toCurrencyCode = getCurrencyCode(currencySelectTo.value);

    // Adicionando a chave de API
    const url = `https://api.exchangerate.host/convert?from=${fromCurrencyCode}&to=${toCurrencyCode}&amount=${inputCurrencyValue}&access_key=c9e230dfdce933d1984463b97bc8e5f3`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.result) {
            throw new Error('Erro ao obter taxa de câmbio.');
        }

        const convertedValue = data.result;

        currencyValueConverted.innerHTML = new Intl.NumberFormat(getLocale(currencySelectTo.value), {
            style: 'currency',
            currency: toCurrencyCode
        }).format(convertedValue);

        currencyValueToConvert.innerHTML = new Intl.NumberFormat(getLocale(currencySelectFrom.value), {
            style: 'currency',
            currency: fromCurrencyCode
        }).format(inputCurrencyValue);

    } catch (error) {
        console.error('Erro ao converter moeda:', error);
        alert('Ocorreu um erro ao converter a moeda. Tente novamente mais tarde.');
    }
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

