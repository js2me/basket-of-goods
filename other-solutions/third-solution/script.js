const currencySymbols = {
    rubles: '₽',
    euros: '€',
    US_dollars: '$',
    pounds: '£',
    yens: '¥'
}, currencies = {
    rubles: 59.035,
    euros: 0.9363,
    US_dollars: 1,
    pounds: 0.7955,
    yens: 112.283
};

let selectedCart = [
    {price: 20},
    {price: 45},
    {price: 67},
    {price: 1305}
];


let fullPrice = selectedCart.reduce((prev, curr) => prev && (prev.price && prev.price + curr.price || prev + curr.price) || curr.price);
const totalCartPrice = {};
Object.keys(currencies).map(currency => totalCartPrice[currency] = currencies[currency] * fullPrice);


console.warn(
    `Data : 
        ${Object.keys(totalCartPrice).map(currency => `\r\n ${currency} : ${totalCartPrice[currency]} ${currencySymbols[currency]}`)}
    `);