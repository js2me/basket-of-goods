let currencyData = require('./currencies.json');


class Card{
    constructor(...prices){
        let _card = prices && prices.map(price => { return {price}}) || [];
        this.add = (price) => {
            _card.push({price});
            console.log(`product with price ${price} added to card`);
        };
        this.getCard = () => _card;
        this.extract = (price) => _card = _card.filter((item)=>item.price != price);
        // return _card;
    }
    sum(){
        return this.getCard().reduce(
            (prev,curr) => prev &&
            (prev.price && prev.price + curr.price || prev + curr.price) ||
            curr.price);
    }
}
class Currency {
    constructor(obj) {
        this.name = obj.name;
        this.findCommonInfo(this.name, obj.transfers, obj.symbol);
        // this.transfers = obj.transfers || this.findTransfer(obj.name);
        // this.symbol = obj.symbol || this.findSymbol(obj.name);
    }
    findCommonInfo(name, transfers, symbol) {
        let currency = currencyData[name];
        if (currency) {
            this.setSymbol(symbol || currency.symbol);
            this.setTransfer(transfers || currency.transfers);
            console.log(`common data ( transfers, symbol ) successfully added to the [[${name}]] currency`);
        } else {
            console.error(`common data ( transfers, symbol ) not found on the server. Please add this data manually.`)
        }
    }

    setTransfer(transfers) {
        if (transfers) {
           return this.transfers = transfers;
        }
        console.error(`transfers for currency ${this.name} not found. Please add transfers`);
        return null;
    }

    setSymbol(symbol) {
        if (symbol) {
            return this.symbol = symbol;
        }
        console.error(`symbol for currency [[${this.name}]] not found. Please add symbol`);
        return null;
    }
}
class Currencies {
    constructor(currencies) {
        // super();
        let _currencies = {},
            _symbols = {}
        // this.baseCurrency = new Currency({name: 'dollars'});
        this.getCurrencySymbols = () => _symbols;
        this.getCurrencies = () => _currencies;
        this.getCurrency = currency => _currencies[currency];
        this.attachCurrency = currency => _currencies[currency.name] = currency;

        this.collectCurrencies(currencies);
    }

    collectCurrencies(objs) {
        if (typeof objs == 'string') {
            objs.split(' ').map(currency => this.add(currency) );
            return;
        }
        if (typeof objs == 'object') {
            for (let currency in objs) {
                this.add(currency);
            }
        }
    }
    transferPrice(price){
        let currencies = this.getCurrencies(),
            transfers = Object.assign({},this.baseCurrency.transfers),
            totalCartPrice = {};
        for(let currency in currencies){
            totalCartPrice[currency] = transfers[currency] * price;
        }
        console.log(`Data : 
            ${Object.keys(totalCartPrice).map(currency => `\r\n ${currency} : ${totalCartPrice[currency]} ${currencyData[currency].symbol}`)} 
            `);
        return totalCartPrice;

    }
    setBaseCurrency(name) {
        console.warn(`changed base currency to ${name}`);
        return this.baseCurrency = new Currency({name});
    }

    add(name, transfers, symbol) {
        if (this.getCurrency(name) == undefined) {
            return this.attachCurrency(new Currency({name, transfers, symbol}));
        } else {
            console.warn(`the ${name} currency already added to currencies container`);
            return null;
        }
    }
}


var currencies = new Currencies('rubles dollars euros yens pounds');

currencies.setBaseCurrency('dollars');

let selectedCart = new Card(20,45,67);
selectedCart.add(1305);
let fullPrice = selectedCart.sum();
let priceInAllCurrencies = currencies.transferPrice(fullPrice);
// console.log(priceInAllCurrencies);