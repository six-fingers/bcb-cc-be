// cc as abbreviation for CryptoCompare

export interface IccResponse {
    DISPLAY: IccCryptoCurrencies
}

export interface IccCryptoCurrencies {
    BTC: IccCryptoCurrency,
    ETH: IccCryptoCurrency,
    XRP: IccCryptoCurrency,
    LTC: IccCryptoCurrency,
    BCH: IccCryptoCurrency,
    ETC: IccCryptoCurrency
}

interface IccCryptoCurrency {
    USD: IccCurrencies,
    GBP: IccCurrencies,
    EUR: IccCurrencies,
    JPY: IccCurrencies,
    ZAR: IccCurrencies
}

export interface IccCurrencies {
    USD: IccCurrency,
    GBP: IccCurrency,
    EUR: IccCurrency,
    JPY: IccCurrency,
    ZAR: IccCurrency
}

interface IccCurrency {
    PRICE: string
}