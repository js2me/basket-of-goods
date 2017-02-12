import {
    GET_CURRENCIES,
    GET_GOODS,
    UPDATE_BASE,
    UPDATE_SELECTED_GOODS,
    UPDATE_PAYMENT
} from '../constants/App';
import fetch from 'isomorphic-fetch'
import {localeCurrencies} from './CurrencyConverter'
const API_CURRENCY_URL = 'http://api.fixer.io/latest';
const BASE_DEFAULT_CURRENCY = 'USD';
let base = 'USD',
    symbols = ['USD', 'GBP', 'EUR', 'RUB', 'JPY'];
let goods = [
    {price: 20},
    {price: 45},
    {price: 67},
    {price: 1305},
    {price: 64},
    {price: 12}
],
    selectedGoods = [];
function configureCurrenciesApi(_base = base, _symbols = symbols) {
    return `${API_CURRENCY_URL}?base=${_base}&symbols=${_symbols.join(',')}`;
}
export function getCurrencies(base, symbols) {
    return async(dispatch) => {
        await fetch(configureCurrenciesApi(base, symbols))
            .then(
                response => {
                    if (response.status !== 200) {
                        dispatch({
                            type: GET_CURRENCIES,
                            error: true,
                            payload: new Error(response)
                        });
                        return;
                    }
                    response.json().then(data => {
                        // gameField = data;
                        dispatch({
                            type: GET_CURRENCIES,
                            fetching: false,
                            payload: data
                        });
                    });
                }
            )
            .catch(err=>console.log(err));
    }

}



async function convertPricesToActualCurrency(oldBase, newBase, dispatch) {
    /*eslint-disable*/
    if (newBase == BASE_DEFAULT_CURRENCY) {
        dispatch({
            type: GET_GOODS,
            payload: goods
        });
        return;
    }
    const newBaseData = await fetch(configureCurrenciesApi(BASE_DEFAULT_CURRENCY, [newBase]));
    newBaseData.json().then(data=> {
        let factor = data.rates[newBase];
        let _goods = goods.slice();
        for (let i = 0; i < _goods.length; i++) {
            _goods[i] = Object.assign({price: parseInt(_goods[i].price * factor)});
        }
        dispatch({
            type: GET_GOODS,
            payload: _goods
        });
    });
}
export function updateBaseCurrency(_base) {
    return (dispatch) => {
        dispatch({
            type: GET_GOODS,
            fetching:true
        });
        setTimeout(()=>{
            convertPricesToActualCurrency(base, _base, dispatch);
            base = _base;
            dispatch({
                type: UPDATE_BASE,
                payload: base
            });
        },300);
    }
}
export function getGoods() {
    return (dispatch) => {
        dispatch({
            type: GET_GOODS,
            payload: goods
        });
    }
}
async function updatePayment(dispatch){
    let price = selectedGoods.reduce((prev, curr) => prev && (prev.price && prev.price + curr.price || prev + curr.price) || curr.price);
    const internationalCurrencies = await fetch(configureCurrenciesApi(BASE_DEFAULT_CURRENCY, symbols));
    let payment = Object.assign({});
    internationalCurrencies.json().then(data=>{
        let {rates} = data;
        Object.keys(rates).map((item,index)=>{
            payment[localeCurrencies[item]] = parseInt((price.price || price) * rates[item]);
        });
        payment[localeCurrencies[BASE_DEFAULT_CURRENCY]] = (price.price || price);
        dispatch({
            type:UPDATE_PAYMENT,
            payload:payment
        });
    });
}
export function selectGood(good) {
    return (dispatch) => {
        selectedGoods.push(good);
        updatePayment(dispatch);
        dispatch({
            type: UPDATE_SELECTED_GOODS,
            payload: selectedGoods
        });
    }
}