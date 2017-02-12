export let localeCurrencies = {
    USD:'dollars',
    GBP:'pounds',
    EUR:'euros',
    RUB:'rubles',
    JPY:'yens'
};

export function convertCurrencyToString(symbol){
    return localeCurrencies[symbol];
}