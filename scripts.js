document.addEventListener('DOMContentLoaded', (event) => {
    const currencySelect = document.querySelector('.currency-select');
    const convertButton = document.querySelector('.convert-button');

    currencySelect.addEventListener('change', updateCurrencyImage);
    convertButton.addEventListener('click', convertValues);
});

function updateCurrencyImage() {
    const currencySelect = document.querySelector('.currency-select');
    const currencyImage = document.querySelector('.currency-image-change');
    const currencyText = document.querySelector('.currency-box:nth-child(3) .currency');

    if (currencySelect.value === 'dolar') {
        currencyImage.src = '/assets/dolar.png';
        currencyImage.alt = 'logo-moeda-convertida';
        currencyText.textContent = 'Dólar';
    } else if (currencySelect.value === 'euro') {
        currencyImage.src = '/assets/euro.png';
        currencyImage.alt = 'logo-moeda-convertida';
        currencyText.textContent = 'Euro';
    } else if (currencySelect.value === 'libra') {
        currencyImage.src = '/assets/libra.png';
        currencyImage.alt = 'logo-moeda-convertida';
        currencyText.textContent = 'Libra';
    } else if (currencySelect.value === 'bitcoin') {
        currencyImage.src = '/assets/bitcoin.png';
        currencyImage.alt = 'logo-moeda-convertida';
        currencyText.textContent = 'Bitcoin';
    }
}

function convertValues() {
    const inputCurrencyValue = document.querySelector('.input-currency').value.replace(/[^0-9,.-]+/g, '').replace(',', '.');
    const currencySelect = document.querySelector('.currency-select');
    const currencyValueToConvert = document.querySelector('.currency-value-to-convert');
    const currencyValueConverted = document.querySelector('.currency-value');

    const dolarToday = 5.2;
    const euroToday = 6.2;
    const libraToday = 7.0; // Exemplo de taxa de câmbio para Libra
    const bitcoinToday = 200000; // Exemplo de taxa de câmbio para Bitcoin

    if (!inputCurrencyValue || isNaN(inputCurrencyValue)) {
        alert('Por favor, insira um valor válido.');
        return;
    }

    if (currencySelect.value == "dolar") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCurrencyValue / dolarToday);
    } else if (currencySelect.value == "euro") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyValue / euroToday);
    } else if (currencySelect.value == "libra") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(inputCurrencyValue / libraToday);
    } else if (currencySelect.value == "bitcoin") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "BTC"
        }).format(inputCurrencyValue / bitcoinToday);
    }

    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyValue);
}
